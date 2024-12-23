import { TodoListScreen } from "@/components/screens/todo-list-screen";
import { mixpanel } from "@/services/mixpanel-service";
import { useEffect } from "react";

const TabsHomeRoot = () => {
    useEffect(() => {
        mixpanel.track("Dashboard", {});
    }, []);
    return <TodoListScreen />;
};

export default TabsHomeRoot;
