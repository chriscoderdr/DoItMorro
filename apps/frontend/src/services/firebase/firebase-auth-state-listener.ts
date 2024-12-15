import { authActions, store } from "@/state";
import { User } from "firebase/auth";

const firebaseAuthStateListener = (user: User | null) => {
    if (user) {
        console.log(`firebaseAuthStateListener: User ${user.email} logged in`);
        store.dispatch(
            authActions.loginUserAction({
                firebaseUid: user.uid,
                email: user.email,
                name: user.displayName,
            }),
        );
    } else {
        console.log("firebaseAuthStateListener: User logged out");
        store.dispatch(authActions.logoutAction());
    }
};

export { firebaseAuthStateListener };
