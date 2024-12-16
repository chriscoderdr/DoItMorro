import { RootState } from "@/state/store/root-reducer";
import { Redirect } from "expo-router";
import { Image, ImageBackground, View } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LoadingIndicator } from "@/components/common/loading-indicator";

const Index = () => {
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        // Delay the redirect by 5 seconds
        const timer = setTimeout(() => {
            setShouldRedirect(true);
        }, 3000);

        // Cleanup the timer
        return () => clearTimeout(timer);
    }, []);

    // Determine the route
    const initialRoute = isLoggedIn ? "/(tabs)" : "/login";

    // Perform the redirect after 5 seconds
    if (shouldRedirect) {
        return <Redirect href={initialRoute} />;
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image
                source={require("../assets/images/do-it-morro-logo.png")}
                style={{
                    width: 200,
                    height: 200,
                }}
            />
            <LoadingIndicator />
        </View>
    );
};

export default Index;
