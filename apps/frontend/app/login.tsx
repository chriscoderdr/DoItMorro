import { LoginForm } from "@/components/forms/auth/login-form";
import { useRouter } from "expo-router";

const LoginScreen = () => {
    const router = useRouter();
    return (
        <LoginForm
            loginUser={() => {}}
            isLoading={false}
            onGoToRegister={() => {
                router.push("/sign-up");
            }}
        />
    );
};

export default LoginScreen;
