import { StyleSheet } from "react-native";

export const getCalendarModalStyles = () =>
    StyleSheet.create({
        floatingOverlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark background overlay
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        },
        modalContainer: {
            backgroundColor: "#fff", // Solid white background for modal
            borderRadius: 12,
            padding: 16,
            width: 350,
            maxWidth: "90%",
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
        },
        calendarHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
        },
        navButtonText: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#333",
        },
        headerText: {
            fontSize: 18,
            fontWeight: "bold",
        },
        calendarBody: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
        },
        day: {
            width: "14%",
            aspectRatio: 1,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 4,
            borderRadius: 4,
            backgroundColor: "#f9f9f9",
        },
        dayText: {
            fontSize: 14,
            color: "#333",
        },
        closeButton: {
            marginTop: 16,
            alignItems: "center",
            padding: 12,
            borderRadius: 8,
            backgroundColor: "#4CAF50",
        },
        closeButtonText: {
            color: "#fff",
            fontWeight: "bold",
        },
    });
