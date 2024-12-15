import { StyleSheet, TextStyle } from "react-native";
import { Theme } from "@react-navigation/native";

interface TextStylesParams {
    variant: "title" | "subtitle" | "body" | "caption" | "overline" | "link";
    align: "left" | "center" | "right" | "justify";
    bold: boolean;
    color: keyof Theme["colors"];
    theme: Theme & {
        fonts: {
            regular: { fontFamily: string; fontWeight: "400" };
            medium: { fontFamily: string; fontWeight: "500" };
            bold: { fontFamily: string; fontWeight: "700" };
            light: { fontFamily: string; fontWeight: "300" };
            sizes: {
                extraSmall: { fontSize: number; lineHeight: number };
                small: { fontSize: number; lineHeight: number };
                medium: { fontSize: number; lineHeight: number };
                large: { fontSize: number; lineHeight: number };
                extraLarge: { fontSize: number; lineHeight: number };
            };
        };
    };
}

const getTextStyles = ({ variant, align, bold, color, theme }: TextStylesParams) => {
    const { fontSize, lineHeight } =
        variant === "title"
            ? theme.fonts.sizes.large
            : variant === "subtitle"
              ? theme.fonts.sizes.medium
              : variant === "caption" || variant === "overline"
                ? theme.fonts.sizes.small
                : variant === "link"
                  ? theme.fonts.sizes.medium
                  : theme.fonts.sizes.medium;

    const fontFamily =
        bold || variant === "title"
            ? theme.fonts.bold.fontFamily
            : variant === "subtitle"
              ? theme.fonts.medium.fontFamily
              : theme.fonts.regular.fontFamily;

    const fontWeight =
        bold || variant === "title"
            ? theme.fonts.bold.fontWeight
            : variant === "subtitle"
              ? theme.fonts.medium.fontWeight
              : theme.fonts.regular.fontWeight;

    const textColor = theme.colors[color];

    return StyleSheet.create({
        text: {
            fontSize,
            lineHeight,
            fontFamily,
            fontWeight,
            textAlign: align,
            color: textColor,
        } as TextStyle,
    });
};

export { getTextStyles };
