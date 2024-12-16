import { useEffect } from "react";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import { authConfig } from "@/config";

export const useFacebookSignIn = (
    onSuccess: (accessToken: string) => void,
    onError: (error: Error) => void,
) => {
    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: authConfig.FACEBOOK_APP_ID,
        responseType: ResponseType.Token,
    });

    useEffect(() => {
        if (response?.type === "success") {
            const { access_token } = response.params;
            onSuccess(access_token);
        } else if (response?.type === "error") {
            onError(new Error("Facebook Sign-In failed"));
        }
    }, [response]);

    const signIn = () => {
        promptAsync();
    };

    return { request, signIn };
};
