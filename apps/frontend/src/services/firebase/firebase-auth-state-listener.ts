import { authActions, store } from "@/state";
import { User } from "firebase/auth";

const firebaseAuthStateListener = (user: User | null) => {
    if (user) {
        store.dispatch(
            authActions.setUserAction({
                id: user.uid,
                email: user.email,
                name: user.displayName,
            }),
        );
    }
};

export { firebaseAuthStateListener };
