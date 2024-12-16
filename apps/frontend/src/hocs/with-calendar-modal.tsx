import { CalendarModal } from "@/components/forms/fields/date-picker-field/calendar-modal";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

export const withCalendarModal = (WrappedComponent: React.ComponentType<any>) => {
    const WithCalendarModal = (props: any) => {
        // Calendar state
        const [isCalendarVisible, setCalendarVisible] = useState(false);
        const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
        const [activeYear, setActiveYear] = useState(new Date().getFullYear());
        const [selectedDate, setSelectedDate] = useState<Date | null>(null);

        // Calendar control functions
        const openCalendar = () => setCalendarVisible(true);
        const closeCalendar = () => setCalendarVisible(false);

        const handleDateSelect = (date: Date) => {
            setSelectedDate(date);
            closeCalendar();
        };

        return (
            <View style={styles.container}>
                {/* Render CalendarModal */}
                {isCalendarVisible && (
                    <View style={styles.modalOverlay}>
                        <CalendarModal
                            visible={isCalendarVisible}
                            onClose={closeCalendar}
                            onDateSelect={handleDateSelect}
                            activeMonth={activeMonth}
                            activeYear={activeYear}
                            setActiveMonth={setActiveMonth}
                            setActiveYear={setActiveYear}
                        />
                    </View>
                )}

                {/* Pass down props */}
                <WrappedComponent
                    {...props}
                    openCalendar={openCalendar}
                    selectedDate={selectedDate}
                />
            </View>
        );
    };

    // Set display name for debugging
    WithCalendarModal.displayName = `WithCalendarModal(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return WithCalendarModal;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
});
