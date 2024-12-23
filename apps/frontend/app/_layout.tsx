import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { getLocales } from "expo-localization";

import { Provider } from "react-redux";
import { persistor, store } from "@/state";
import { PersistGate } from "redux-persist/integration/react";
import { DoItMorroTheme } from "@/theming";
import { IntlProvider } from "react-intl";
import enMessages from "@/i18n/en.json";
import esMessages from "@/i18n/es.json";
import { AppNavigator } from "@/navigation";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoadingScreen } from "@/components/screens";
import { EvilIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { usePathname } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        ...Ionicons.font,
        ...MaterialIcons.font,
        ...EvilIcons.font,
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        Roboto_400Regular,
        Roboto_700Bold,
    });

    const [locale, setLocale] = useState<string>("en");
    const [currentMessages, setCurrentMessages] = useState<typeof enMessages>(enMessages);
    const [allLoaded, setAllLoaded] = useState(false);

    useEffect(() => {
        const loadResources = async () => {
            const locales = getLocales();
            const primaryLocale = locales[0]?.languageCode || "en";
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

            if (!fontsLoaded) return;

            setAllLoaded(true);
            SplashScreen.hideAsync();
        };

        loadResources();
    }, [fontsLoaded]);

    if (!allLoaded) {
        return <LoadingScreen />;
    }

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <PersistGate loading={<LoadingScreen />} persistor={persistor}>
                    <IntlProvider locale={locale} messages={currentMessages}>
                        <ThemeProvider value={DoItMorroTheme}>
                            <AppNavigator />
                        </ThemeProvider>
                    </IntlProvider>
                </PersistGate>
            </Provider>
        </SafeAreaProvider>
    );
}
