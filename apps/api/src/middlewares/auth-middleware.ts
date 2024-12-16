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

    console.log(`TOKEN: ${token}`);

    try {
        const decodedToken = await firebaseAuth.verifyIdToken(token);

        let user = await models.User.findOne({
            where: { firebase_uid: decodedToken.uid },
        });

        console.error(`USEER###: ${JSON.stringify(user)}`);

        // Create a new user if they don't exist
        if (!user) {
            user = await models.User.create({
                firebase_uid: decodedToken.uid,
                email: decodedToken.email || decodedToken.uid + "@firebase.com",
                display_name: decodedToken.name,
                profile_picture_url: decodedToken.picture,
            });
        }

        console.log(`user: ${JSON.stringify(user.dataValues.id)}`);
        // Set user information in the state
        ctx.state.user = {
            userId: user.dataValues.id,
            uid: decodedToken.uid,
            email: user.dataValues.email,
        };

        await next();
    } catch (error) {
        console.error("Authentication Error:", error);
        ctx.status = 401;
        ctx.body = { error: "Unauthorized: Invalid token" };
    }
};
