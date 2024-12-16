import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { ThemedText, RoundedButton } from "@/components/common";
import { FormattedMessage, useIntl } from "react-intl";
import { ScrollableFormContainer } from "../../scrollable-form-container";
import { InputTextField } from "../../fields/input-text-field";
import { InputTextAreaField } from "../../fields/input-text-area-field";
import { DatePickerField } from "../../fields/date-picker-field/date-picker-field";
import { withCalendarModal } from "@/hocs/with-calendar-modal";
import { useUpdateTodoMutation } from "@/state/api/slices/todo-api-slice";
import { ConfirmationModal } from "@/components/common/confirmation-modal/confirmation-modal";
import { View } from "react-native";
import { getEditTodoFormStyles } from "./styles";

interface IEditTodoFormBaseProps {
    todoId: number;
    initialTitle?: string;
    initialDescription?: string;
    initialDueDate?: Date;
    onSuccess: () => void; // Callback after successful edit
    openCalendar: () => void; // Injected by HOC
    selectedDate?: Date; // Injected by HOC
}

const EditTodoFormNoEnhanced: React.FC<IEditTodoFormBaseProps> = ({
    todoId,
    initialTitle = "",
    initialDescription = "",
    initialDueDate,
    openCalendar,
    selectedDate,
    onSuccess,
}) => {
    const theme = useTheme();
    const styles = getEditTodoFormStyles({ theme });
    const intl = useIntl();
    const [updateTodo] = useUpdateTodoMutation();
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription || "");
    const [dueDate, setDueDate] = useState<Date | undefined>(initialDueDate);
    const [titleError, setTitleError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    useEffect(() => {
        setDueDate(selectedDate || initialDueDate);
    }, [selectedDate, initialDueDate]);

    const validateForm = () => {
        if (!title.trim()) {
            setTitleError(intl.formatMessage({ id: "form.required" }));
            return false;
        }
        setTitleError(null);
        return true;
    };

    const handleUpdateTodo = async () => {
        if (!validateForm()) return;

        try {
            setIsLoading(true);
            await updateTodo({
                id: todoId,
                data: {
                    title,
                    description: description || undefined,
                    dueDate: dueDate?.toISOString() || undefined,
                },
            }).unwrap();
            setSuccessModalVisible(true); // Show success modal
        } catch (error) {
            console.error(error);
            setErrorModalVisible(true); // Show error modal
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseErrorModal = () => {
        setErrorModalVisible(false);
    };

    const handleCloseSuccessModal = () => {
        setSuccessModalVisible(false);
        onSuccess(); // Invoke callback after success
    };

    return (
        <>
            <ScrollableFormContainer>
                <View style={styles.container}>
                    {/* Title Section */}
                    <ThemedText variant="title" align="center" style={styles.title}>
                        <FormattedMessage id="editTodo.title" />
                    </ThemedText>
                    <ThemedText variant="subtitle" align="center" style={styles.subtitle}>
                        <FormattedMessage id="editTodo.subtitle" />
                    </ThemedText>

                    {/* Input Fields */}
                    <View style={styles.inputContainer}>
                        <InputTextField
                            label="editTodo.title.label"
                            placeholder="editTodo.title.placeholder"
                            fullWidth
                            onChangeText={setTitle}
                            testID="todo-title-input"
                            errorText={titleError || undefined}
                            value={title}
                        />
                        <InputTextAreaField
                            label="editTodo.description.label"
                            placeholder="editTodo.description.placeholder"
                            fullWidth
                            onChangeText={setDescription}
                            testID="todo-description-input"
                            value={description}
                        />
                        <DatePickerField
                            label="editTodo.dueDate.label"
                            placeholder="editTodo.dueDate.placeholder"
                            selectedDate={dueDate}
                            onOpenCalendar={openCalendar}
                        />
                    </View>

                    {/* Update Todo Button */}
                    <View style={styles.buttonContainer}>
                        <RoundedButton
                            text={
                                isLoading
                                    ? intl.formatMessage({ id: "editTodo.button.inProgress" })
                                    : intl.formatMessage({ id: "editTodo.button" })
                            }
                            disabled={isLoading || !title.trim()}
                            onPress={handleUpdateTodo}
                            testID="edit-todo-button"
                        />
                    </View>
                </View>
            </ScrollableFormContainer>

            {/* Error Modal */}
            <ConfirmationModal
                visible={errorModalVisible}
                title={intl.formatMessage({ id: "editTodo.error.title" })}
                message={intl.formatMessage({ id: "editTodo.error" })}
                confirmText={intl.formatMessage({ id: "editTodo.error.confirmText" })}
                onConfirm={handleCloseErrorModal}
            />

            {/* Success Modal */}
            <ConfirmationModal
                visible={successModalVisible}
                title={intl.formatMessage({ id: "editTodo.success.title" })}
                message={intl.formatMessage({ id: "editTodo.success.message" })}
                confirmText={intl.formatMessage({ id: "editTodo.success.confirmText" })}
                onConfirm={handleCloseSuccessModal}
            />
        </>
    );
};

// Explicitly type the HOC-wrapped component
const EditTodoForm = withCalendarModal<IEditTodoFormBaseProps>(EditTodoFormNoEnhanced);

export { EditTodoForm };
