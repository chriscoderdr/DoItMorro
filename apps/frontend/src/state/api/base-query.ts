import { fetchBaseQuery, FetchArgs } from "@reduxjs/toolkit/query";
import { RootState } from "../store/root-reducer";
import { firebaseService } from "@/services";

export const baseQuery = async (args: FetchArgs, api: any, extraOptions: any) => {
    const baseQuery = fetchBaseQuery({
        timeout: 5000, // Increased timeout for better reliability
        baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || "",
        prepareHeaders: async (headers, { getState }) => {
            const isLoggedIn = (getState() as RootState).auth.isLoggedIn;

            if (isLoggedIn) {
                const token = await firebaseService.auth.currentUser?.getIdToken();

                if (token) {
                    headers.set("Authorization", `Bearer ${token}`);
                }
            }

            return headers;
        },
    });

    let result = await baseQuery(args, api, extraOptions);

    console.log("Base query result:", result);
    return result;
};
