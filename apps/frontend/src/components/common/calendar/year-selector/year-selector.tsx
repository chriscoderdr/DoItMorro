import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { useIntl } from "react-intl";
import { useTheme } from "@react-navigation/native";
import { ThemedText } from "../../themed-text";
import { getYearSelectorStyles } from "./styles";

export const YearSelector: React.FC<IYearSelectorProps> = ({
    currentYear,
    activeYear,
    onSelectYear,
    onClose,
    minYear = currentYear - 50, // Default minimum year
    maxYear = currentYear + 50, // Default maximum year
}) => {
    const flatListRef = useRef<FlatList<number>>(null);
    const theme = useTheme();
    const intl = useIntl();
    const styles = getYearSelectorStyles({ theme });

    // Generate the range of years
    const generateYearRange = () =>
        Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

    const yearRange = generateYearRange();
    const currentYearIndex = yearRange.findIndex((year) => year === currentYear);

    // Scroll to the current year when the component mounts
    useEffect(() => {
        if (flatListRef.current && currentYearIndex >= 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToIndex({
                    index: currentYearIndex,
                    animated: true,
                });
            }, 50); // Slight delay to ensure FlatList is ready
        }
    }, [currentYearIndex]);

    const handleScrollError = (info: { index: number; highestMeasuredFrameIndex: number }) => {
        console.warn(
            `Scroll Error: Attempted to scroll to index ${info.index}, but highest measured index is ${info.highestMeasuredFrameIndex}.`,
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={yearRange}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.yearItem, item === activeYear && styles.activeYearItem]}
                        onPress={() => onSelectYear(item)}
                        activeOpacity={0.7}
                    >
                        <ThemedText
                            variant="body"
                            color={
                                item === activeYear
                                    ? "onPrimary"
                                    : item === currentYear
                                      ? "notification"
                                      : "text"
                            }
                            style={[
                                styles.yearText,
                                item === activeYear && styles.activeYearText,
                                item === currentYear && styles.currentYearText,
                            ]}
                        >
                            {intl.formatNumber(item)}
                        </ThemedText>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                getItemLayout={(data, index) => ({
                    length: 50, // Approximate height of each item
                    offset: 50 * index,
                    index,
                })}
                initialNumToRender={20}
                onScrollToIndexFailed={handleScrollError} // Log errors for debugging
            />
        </View>
    );
};
