import { PersistConfig, persistReducer } from "redux-persist";
import { rootReducer, RootState } from "./root-reducer";
import ExpoFileSystemStorage from "@/services/expo-file-system-storage";
import { Platform } from "react-native";

const blacklist = ["loginForm", "addTodoForm", "signUpForm"];

if (Platform.OS === "web") {
    blacklist.push("auth");
}

const persistConfig: PersistConfig<RootState> = {
    key: "root",
    storage: ExpoFileSystemStorage,
    blacklist,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export { persistedReducer };
