import { AddTodoForm } from "@/components/forms/todos/add-todo-form/add-todo-form";
import { View } from "react-native";

export default function TestIntegrationScreen() {
    return (
        <View style={{ flex: 1 }}>
            <AddTodoForm />
        </View>
    );
}
