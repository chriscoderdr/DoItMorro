interface IDatePickerInputProps {
    label: string;
    placeholder?: string;
    selectedDate?: Date;
    onOpenCalendar: () => void;
    errorText?: string;
}

export { IDatePickerInputProps };
