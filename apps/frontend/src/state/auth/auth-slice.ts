import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./types";
import { addAuthExtraReducers } from "./extra-reducers";
import { router } from "expo-router";
import { mixpanel } from "@/services/mixpanel-service";
import { Platform } from "react-native"; // Platform detection

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
};

const getPlatformInfo = () => {
    if (Platform.OS === "ios") return "iOS";
    if (Platform.OS === "android") return "Android";
    return "Web";
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        loginUser(state, action: PayloadAction<User | null>) {
            if (!state.isLoggedIn) {
                state.isLoggedIn = true;
                state.user = action.payload;
                // router.replace("/(tabs)"); // Navigate to the dashboard

                // Mixpanel: Add platform-specific information
                const platform = getPlatformInfo();
                mixpanel.identify(state.user?.firebaseUid || "NO_ID");
                mixpanel.getPeople().set("$name", state.user?.name);
                mixpanel.getPeople().set("$email", state.user?.email);
                mixpanel.getPeople().set("$platform", platform);
                mixpanel.track("User Login", {
                    platform: platform,
                    firebaseUid: state.user?.firebaseUid || "NO_ID",
                });
            }
        },
        logoutUser(state, action: PayloadAction<User | null>) {
            if (state.isLoggedIn) {
                state.isLoggedIn = false;
                state.user = null;

                // router.replace("/login"); // Navigate to the login screen

                // Mixpanel: Log logout event with platform
                const platform = getPlatformInfo();
                mixpanel.track("User Logout", {
                    platform: platform,
                });
            }
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
        addAuthExtraReducers(builder);
    },
});

const authReducer = authSlice.reducer;

export { authReducer };
