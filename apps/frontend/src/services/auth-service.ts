import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/config";

// Initialize Firebase App and Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * Configures Google Sign-In.
 */
export const configureGoogleSignIn = (): void => {
    console.log("Google Sign-In configured through Firebase JavaScript SDK.");
};

/**
 * Signs in with Google using Firebase Authentication.
 */
export const signInWithGoogle = async (): Promise<void> => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        console.log("User signed in with Google:", user);
        console.log("Access Token:", token);
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error("Error during Google Sign-In:", {
            errorCode,
            errorMessage,
            email,
            credential,
        });
        throw error;
    }
};

/**
 * Signs in with Facebook using Firebase Authentication.
 */
export const signInWithFacebook = async (): Promise<void> => {
    try {
        const provider = new FacebookAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        console.log("User signed in with Facebook:", user);
        console.log("Access Token:", token);
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = FacebookAuthProvider.credentialFromError(error);

        console.error("Error during Facebook Sign-In:", {
            errorCode,
            errorMessage,
            email,
            credential,
        });
        throw error;
    }
};
