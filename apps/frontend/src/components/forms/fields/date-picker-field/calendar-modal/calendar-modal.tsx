import React from "react";
import { Calendar } from "@/components/common/calendar";
import { ReusableModal } from "@/components/common/reusable-modal";

interface ICalendarModalProps {
    visible: boolean;
    onClose: () => void;
    activeMonth: number;
    activeYear: number;
    setActiveMonth: (month: number) => void;
    setActiveYear: (year: number) => void;
    onDateSelect: (date: Date) => void;
}

export const CalendarModal: React.FC<ICalendarModalProps> = ({
    visible,
    onClose,
    activeMonth,
    activeYear,
    setActiveMonth,
    setActiveYear,
    onDateSelect,
}) => {
    const goToToday = () => {
        const today = new Date();
        setActiveMonth(today.getMonth());
        setActiveYear(today.getFullYear());
    };
    // min today Date
    return (
        <ReusableModal visible={visible} onClose={onClose}>
            <Calendar
                activeMonth={activeMonth}
                activeYear={activeYear}
                setActiveMonth={setActiveMonth}
                setActiveYear={setActiveYear}
                onDateSelect={onDateSelect}
                onGoToToday={goToToday}
                onClose={onClose}
                minDate={new Date()}
            />
        </ReusableModal>
    );
};