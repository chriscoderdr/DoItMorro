import { Mixpanel } from "mixpanel-react-native";

const trackAutomaticEvents = false;
const useNative = false;
const mixpanel = new Mixpanel("4a748aecd7e3e0b7f29f33755d724d93", trackAutomaticEvents, useNative);
mixpanel.init();

export { mixpanel };
