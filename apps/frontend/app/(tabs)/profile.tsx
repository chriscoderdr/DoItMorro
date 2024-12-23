import { ProfileScreen } from "@/components/screens/profile-screen";
import { mixpanel } from "@/services/mixpanel-service";
import { useEffect } from "react";

const Profile = () => {
    useEffect(() => {
        mixpanel.track("Profile", {});
    }, []);
    return <ProfileScreen />;
};

export default Profile;
