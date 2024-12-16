import { PersistConfig, persistReducer } from "redux-persist";
import { rootReducer, RootState } from "./root-reducer";
import ExpoFileSystemStorage from "@/services/expo-file-system-storage";

const persistConfig: PersistConfig<RootState> = {
    key: "root",
    storage: ExpoFileSystemStorage,
    blacklist: ["loginForm", "addTodoForm"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export { persistedReducer };
