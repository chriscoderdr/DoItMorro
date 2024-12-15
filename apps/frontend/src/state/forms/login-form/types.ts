interface LoginFormState {
    email: string;
    password: string;
    emailError?: string;
    passwordError?: string;
    isLoading: boolean;
    error?: string;
    nextAllowedAttempt: number;
}

export { LoginFormState };
