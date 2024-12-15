interface User {
    id: string;
    name: string | null;
    email: string | null;
}

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    nextAllowedAttempt: number;
}

export { AuthState, User };
