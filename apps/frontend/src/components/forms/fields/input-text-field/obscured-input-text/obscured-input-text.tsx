import React, { useState } from "react";
import { InputText } from "../input-text";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { IInputTextProps } from "../input-text/props";

const ObscuredInputText: React.FC<IInputTextProps> = ({ ...inputTextProps }) => {
    const [isTextHidden, setIsTextHidden] = useState(true);
    const theme = useTheme();

    const handleIconPress = () => {
        setIsTextHidden(!isTextHidden);
    };

    return (
        <InputText
            secureTextEntry={isTextHidden}
            textContentType="oneTimeCode"
            {...inputTextProps}
            IconComponent={
                isTextHidden ? (
                    <AntDesign name="eye" size={20} color={theme.colors.secondaryOnBackground} />
                ) : (
                    <AntDesign name="eyeo" size={20} color={theme.colors.secondaryOnBackground} />
                )
            }
            onIconPress={handleIconPress}
        />
    );
};

export default ObscuredInputText;
