interface User {
    id?: string;
    firebaseUid?: string;
    name: string | null;
    email: string | null;
}

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
}

export { AuthState, User };
