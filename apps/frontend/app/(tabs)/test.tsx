import { LoginForm } from "@/components/forms/auth/login-form";
import { TestIntegration } from "@/components/test-integration";
import { View } from "react-native";

export default function TestIntegrationScreen() {
    return (
        <View style={{ flex: 1 }}>
            <TestIntegration />
        </View>
    );
}
