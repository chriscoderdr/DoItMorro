import { LoginForm } from "@/components/forms/auth/login-form";
import { View } from "react-native";

export default function TestIntegrationScreen() {
    return (
        <View style={{ flex: 1 }}>
            <LoginForm loginUser={() => {}} isLoading={false} />
            {/* <TestIntegration /> */}
        </View>
    );
}
