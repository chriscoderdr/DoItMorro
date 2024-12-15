// Define the mapping of Firebase error codes to user-friendly messages
const firebaseErrorMap: Record<string, string> = {
    "auth/invalid-credential": "firebase.error.invalid-credentials",
};

// Utility function to map error codes to user-friendly messages
const mapFirebaseError = (errorCode: string): string => {
    console.log(`Firebase error code: ${errorCode}`);
    return firebaseErrorMap[errorCode] || "login.error";
};

const firebaseErrorMapper = { mapFirebaseError };

export { firebaseErrorMapper };
