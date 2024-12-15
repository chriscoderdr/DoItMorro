import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { getLocales } from "expo-localization";

import { Provider } from "react-redux";
import { persistor, store } from "@/state";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator, View } from "react-native";
import { DoItMorroTheme } from "@/theming";
import { IntlProvider } from "react-intl";
import enMessages from "@/i18n/en.json";
import esMessages from "@/i18n/es.json";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const LoadingScreen = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
);

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    const [locale, setLocale] = useState<string>("en");
    const [currentMessages, setCurrentMessages] = useState<typeof enMessages>(enMessages);
    const [allLoaded, setAllLoaded] = useState(false);

    useEffect(() => {
        const loadResources = async () => {
            // Load localization
            const locales = getLocales();
            const primaryLocale = locales[0]?.languageCode || "en"; // Fallback to "en" if undefined
            const supportedLocales: Record<string, typeof enMessages> = {
                en: enMessages,
                es: esMessages,
            };

            if (supportedLocales[primaryLocale]) {
                setLocale(primaryLocale);
                setCurrentMessages(supportedLocales[primaryLocale]);
            } else {
                setLocale("en");
                setCurrentMessages(enMessages);
            }

            // Wait for fonts to load
            if (!fontsLoaded) return;

            // Simulate additional async tasks here if needed (e.g., API prefetch)
            // await someAsyncTask();

            // Mark all resources as loaded
            setAllLoaded(true);
            SplashScreen.hideAsync();
        };

        loadResources();
    }, [fontsLoaded]);

    if (!allLoaded) {
        return <LoadingScreen />;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingScreen />} persistor={persistor}>
                <IntlProvider locale={locale} messages={currentMessages}>
                    <ThemeProvider value={DoItMorroTheme}>
                        <Stack initialRouteName="login">
                            <Stack.Screen name="login" options={{ headerShown: false }} />
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                            <Stack.Screen name="+not-found" />
                        </Stack>
                        <StatusBar style="auto" />
                    </ThemeProvider>
                </IntlProvider>
            </PersistGate>
        </Provider>
    );
}
