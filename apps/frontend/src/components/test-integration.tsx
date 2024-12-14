import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from "firebase/auth";
import { authActions } from "@/state"; // Ensure these actions are defined in your Redux slice
import { RootState } from "@/state/store/root-reducer";

export const TestIntegration = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                dispatch(
                    authActions.setUserAction({
                        name: user.displayName,
                        email: user.email,
                        id: user.uid,
                    }),
                );
            } else {
                dispatch(authActions.logoutAction());
            }
        });

        return () => unsubscribe();
    }, [auth, dispatch]);

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, "cjgm23@gmail.com", "Elcj2304").catch((error) => {
            console.error("Sign-in error:", error);
        });
    };

    const handleSignOut = () => {
        signOut(auth).catch((error) => {
            console.error("Sign-out error:", error);
        });
    };

    return (
        <View style={{ padding: 20, backgroundColor: "white" }}>
            {user ? (
                <>
                    <Text>Welcome, User ID: {user.id} </Text>
                    <Button title="Sign Out" onPress={handleSignOut} />
                </>
            ) : (
                <>
                    <Text>Please sign in.</Text>
                    <Button title="Sign In Anonymously" onPress={handleSignIn} />
                </>
            )}
        </View>
    );
};
