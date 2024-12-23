import { SignUpForm } from "@/components/forms/auth/sign-up-form";
import { mixpanel } from "@/services/mixpanel-service";
import { RootState } from "@/state/store/root-reducer";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SignUpRoute = () => {
    const router = useRouter();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    useEffect(() => {
        // Track screen view in Mixpanel
        mixpanel.track("Sign Up", {});

        // Redirect to main tabs if the user is already logged in
        if (isLoggedIn) {
            router.replace("/(tabs)");
        }
    }, [isLoggedIn, router]);

    return <SignUpForm />;
};

export default SignUpRoute;
