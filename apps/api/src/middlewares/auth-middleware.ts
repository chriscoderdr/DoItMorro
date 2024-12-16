import { Context, Next } from "koa";
import { firebaseAuth } from "@/config";
import { models } from "@/database/models";

/**
 * Middleware to verify Firebase authentication tokens for the mobile API.
 * Protects routes by ensuring the user is authenticated.
 */
export const authMiddleware = async (ctx: Context, next: Next): Promise<void> => {
    const authHeader = ctx.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        ctx.status = 401;
        ctx.body = { error: "Unauthorized: Missing or invalid token" };
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = await firebaseAuth.verifyIdToken(token);

        let user = await models.User.findOne({
            where: { email: decodedToken.email },
        });

        // Create a new user if they don't exist
        if (!user) {
            user = await models.User.create({
                firebase_uid: decodedToken.uid,
                email: decodedToken.email || decodedToken.uid + "@firebase.com",
                display_name: decodedToken.name,
                profile_picture_url: decodedToken.picture,
            });
        } else if (user) {
            // Update the user's name if it has changed
            if (user.display_name !== decodedToken.name) {
                user.display_name = decodedToken.name;
                await user.save();
            }
        }

        // Set user information in the state
        ctx.state.user = {
            id: user?.id,
            uid: decodedToken.uid,
            email: user?.email,
        };

        await next();
    } catch (error) {
        console.error("Authentication Error:", error);
        ctx.status = 401;
        ctx.body = { error: "Unauthorized: Invalid token" };
    }
};
