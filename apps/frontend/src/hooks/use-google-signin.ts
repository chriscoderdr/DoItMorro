import { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import { ResponseType } from "expo-auth-session";

import { Platform } from "react-native";
import { authConfig } from "@/config";

export const useGoogleSignIn = (
    onSuccess: (userInfo: any) => void,
    onError: (error: Error) => void,
) => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: Platform.select({
            android: authConfig.ANDROID_CLIENT_ID,
            ios: authConfig.IOS_CLIENT_ID,
            default: authConfig.WEB_CLIENT_ID,
        }),
    });

    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;
            onSuccess(id_token);
        } else if (response?.type === "error") {
            onError(new Error("Google Sign-In failed"));
        }
    }, [response]);

    const signIn = () => {
        promptAsync();
    };

    return { request, signIn };
};
