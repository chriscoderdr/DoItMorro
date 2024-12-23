import { updateProfile, reload, UserCredential } from "firebase/auth";

const updateUserProfile = async (userCredential: UserCredential, displayName: string) => {
    const { user } = userCredential;

    try {
        // Update the user's profile
        await updateProfile(user, {
            displayName,
        });

        // Reload the user to fetch the updated profile
        await reload(user);

        // Return the updated user object
        return user;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};

const firebaseUtils = { updateUserProfile };

export { firebaseUtils };
