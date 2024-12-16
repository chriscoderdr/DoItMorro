import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { YearSelector } from "./year-selector";
import { DateItem } from "./date-item"; // Import the new component
import { ThemedText } from "../themed-text";
import { useIntl } from "react-intl";
import { useTheme } from "@react-navigation/native";
import { getCalendarStyles } from "./styles";

interface ICalendarProps {
    activeMonth: number;
    activeYear: number;
    setActiveMonth: (month: number) => void;
    setActiveYear: (year: number) => void;
    onDateSelect: (date: Date) => void;
    onGoToToday: () => void;
    onClose: () => void;
    minDate?: Date;
    maxDate?: Date;
}

const Calendar: React.FC<ICalendarProps> = ({
    activeMonth,
    activeYear,
    setActiveMonth,
    setActiveYear,
    onDateSelect,
    onGoToToday,
    onClose,
    minDate,
    maxDate,
}) => {
    const [isYearSelectorVisible, setYearSelectorVisible] = useState(false);
    const theme = useTheme();
    const intl = useIntl();
    const styles = getCalendarStyles(theme);

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

    const generateDays = (month: number, year: number) =>
        Array.from({ length: daysInMonth(month, year) }, (_, i) => new Date(year, month, i + 1));

    const navigateMonth = (direction: "prev" | "next") => {
        if (direction === "next") {
            setActiveMonth(activeMonth === 11 ? 0 : activeMonth + 1);
            if (activeMonth === 11) setActiveYear(activeYear + 1);
        } else {
            setActiveMonth(activeMonth === 0 ? 11 : activeMonth - 1);
            if (activeMonth === 0) setActiveYear(activeYear - 1);
        }
    };

    const toggleYearSelector = () => setYearSelectorVisible((prev) => !prev);

    const isDateInRange = (date: Date) => {
        if (minDate && date < minDate) return false;
        if (maxDate && date > maxDate) return false;
        return true;
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => navigateMonth("prev")}
                style={styles.navButtonContainer}
                activeOpacity={0.7}
            >
                <ThemedText variant="button" color="primary">
                    {"<"}
                </ThemedText>
            </TouchableOpacity>
            <View style={styles.yearSelectorContainer}>
                <ThemedText
                    variant="title"
                    style={[
                        activeMonth === currentMonth && activeYear === currentYear
                            ? styles.currentMonth
                            : undefined,
                    ]}
                >
                    {intl.formatDate(new Date(activeYear, activeMonth), { month: "long" })}
                </ThemedText>
                <TouchableOpacity
                    onPress={toggleYearSelector}
                    style={styles.yearSelectorButton}
                    activeOpacity={0.7}
                >
                    <ThemedText
                        variant="caption"
                        color="secondaryOnBackground"
                        style={[activeYear === currentYear ? styles.currentYear : undefined]}
                    >
                        {activeYear}
                    </ThemedText>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => navigateMonth("next")}
                style={styles.navButtonContainer}
                activeOpacity={0.7}
            >
                <ThemedText variant="button" color="primary">
                    {">"}
                </ThemedText>
            </TouchableOpacity>
        </View>
    );

    const renderDays = () =>
        generateDays(activeMonth, activeYear).map((day) => (
            <DateItem
                key={day.toISOString()}
                day={day.getDate()}
                isCurrentDay={
                    day.getDate() === currentDay &&
                    activeMonth === currentMonth &&
                    activeYear === currentYear
                }
                isDisabled={!isDateInRange(day)}
                onSelect={() => onDateSelect(day)}
            />
        ));

    const renderFooterButtons = () => (
        <>
            <TouchableOpacity style={styles.todayButton} onPress={onGoToToday} activeOpacity={0.7}>
                <ThemedText variant="button" color="onPrimary">
                    {intl.formatMessage({ id: "calendar.goToToday" })}
                </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
                <ThemedText variant="button" color="onPrimary">
                    {intl.formatMessage({ id: "calendar.close" })}
                </ThemedText>
            </TouchableOpacity>
        </>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {isYearSelectorVisible ? (
                <YearSelector
                    currentYear={currentYear}
                    activeYear={activeYear}
                    onSelectYear={(year) => {
                        setActiveYear(year);
                        setYearSelectorVisible(false);
                    }}
                    onClose={() => setYearSelectorVisible(false)}
                    minYear={minDate ? minDate.getFullYear() : undefined}
                    maxYear={maxDate ? maxDate.getFullYear() : undefined}
                />
            ) : (
                <View style={styles.calendarBody}>{renderDays()}</View>
            )}
            {!isYearSelectorVisible && renderFooterButtons()}
        </View>
    );
};

export { Calendar };
