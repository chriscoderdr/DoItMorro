// src/types/navigation.d.ts
import "@react-navigation/native";

declare module "@react-navigation/native" {
    export type DoItMorroTheme = {
        dark: boolean;
        colors: {
            primary: string;
            background: string;
            card: string;
            text: string;
            border: string;
            notification: string;
            customColor: string; // Declare your custom color here
        };
    };

    export function useTheme(): DoItMorroTheme;
}
