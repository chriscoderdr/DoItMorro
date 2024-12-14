import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
// @ts-ignore
import { getReactNativePersistence, initializeAuth, browserLocalPersistence } from "firebase/auth";

import { firebaseConfig } from "@/config";
import { Platform } from "react-native";

const app = initializeApp(firebaseConfig);

const isNative = Platform.OS === "ios" || Platform.OS === "android";

const auth = isNative
    ? initializeAuth(app, {
          persistence: getReactNativePersistence(AsyncStorage),
      })
    : initializeAuth(app, {
          persistence: browserLocalPersistence,
      });

const firebaseService = {
    app,
    auth,
};

export { firebaseService };
