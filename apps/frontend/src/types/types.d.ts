// src/types/navigation.d.ts
import "@react-navigation/native";

interface IFont {
    fontFamily: string;
    fontWeight:
        | "normal"
        | "bold"
        | "100"
        | "200"
        | "300"
        | "400"
        | "500"
        | "600"
        | "700"
        | "800"
        | "900";
}

declare module "@react-navigation/native" {
    export type Theme = {
        dark: boolean;
        colors: {
            primary: string;
            background: string;
            card: string;
            text: string;
            border: string;
            notification: string;
            onPrimary: string;
            customColor?: string; // Declare your custom color here
            secondaryOnBackground: string;
            secondaryBackground: string;
            secondaryText: string;
            secondaryBorder: string;
            link: string;
        };
        roundness: number;
        fonts: {
            regular: IFont;
            medium: IFont;
            light: IFont;
            thin: IFont;
            bold: IFont;
        };
        spacing: {
            none: number;
            tiny: number;
            small: number;
            medium: number;
            large: number;
            extraLarge: number;
        };
    };

    export function useTheme(): DoItMorroTheme;
}
