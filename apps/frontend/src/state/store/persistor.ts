import persistStore from "redux-persist/es/persistStore";
import { store } from "./configure-store";

const persistor = persistStore(store);

export { persistor };
