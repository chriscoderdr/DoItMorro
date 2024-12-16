import { DefaultTheme } from "@react-navigation/native";

const DoItMorroTheme = {
    ...DefaultTheme,
    roundness: 16, // Rounded edges for a friendly, modern UI
    colors: {
        ...DefaultTheme.colors,
        primary: "#4CAF50", // Vibrant green for action buttons
        background: "#F9FAFB", // Subtle light gray for a clean background
        text: "#212121", // Dark gray for high readability
        card: "#FFFFFF", // Bright white for cards
        border: "#E0E0E0", // Light gray for borders
        notification: "#FF5252", // Alert red for notifications
        onPrimary: "#FFFFFF", // White text on primary buttons
        secondaryBackground: "#E8F5E9", // Soft green for secondary actions
        secondaryText: "#388E3C", // Darker green for secondary text
        secondaryOnBackground: "#616161", // Neutral gray for secondary labels
        link: "#0A84FF", // Bright blue for links
        button: "#FFFFFF",
        completedBackground: "#E9ECEF",
        completedText: "#6C757D",
    },
    fonts: {
        regular: {
            fontFamily: "Roboto-Regular",
            fontWeight: "400" as "400",
        },
        medium: {
            fontFamily: "Roboto-Medium",
            fontWeight: "500" as "500",
        },
        bold: {
            fontFamily: "Roboto-Bold",
            fontWeight: "700" as "700",
        },
        heavy: {
            fontFamily: "Roboto-Black",
            fontWeight: "900" as "900",
        },
        light: {
            fontFamily: "Roboto-Light",
            fontWeight: "300" as "300",
        },
        sizes: {
            extraSmall: { fontSize: 10, lineHeight: 12 }, // For small labels or secondary information
            small: { fontSize: 14, lineHeight: 18 }, // For hints, secondary text
            medium: { fontSize: 18, lineHeight: 22 }, // For main text and body
            large: { fontSize: 24, lineHeight: 30 }, // For headings or key information
            extraLarge: { fontSize: 32, lineHeight: 40 }, // For titles and standout elements
        },
    },
    spacing: {
        none: 0,
        tiny: 4,
        small: 8,
        medium: 16,
        large: 24,
        extraLarge: 32,
    },
};

export { DoItMorroTheme };
