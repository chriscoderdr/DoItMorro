import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { ThemedText, RoundedButton } from "@/components/common";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { FormattedMessage, useIntl } from "react-intl";
import { getAddTodoFormStyles } from "./styles";
import { ScrollableFormContainer } from "../../scrollable-form-container";
import { InputTextField } from "../../fields/input-text-field";
import { InputTextAreaField } from "../../fields/input-text-area-field";
import { DatePickerField } from "../../fields/date-picker-field/date-picker-field";
import { withCalendarModal } from "@/hocs/with-calendar-modal";
import { addTodoActions } from "@/state/forms/add-todo-form/actions";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store/root-reducer";
import { View } from "react-native";
import { useCreateTodoMutation } from "@/state/api/slices/todo-api-slice";
import { ConfirmationModal } from "@/components/common/confirmation-modal/confirmation-modal";

interface IAddTodoFormProps {
    openCalendar: () => void;
    selectedDate?: Date;
}

const AddTodoFormNoEnhanced: React.FC<IAddTodoFormProps> = ({ openCalendar, selectedDate }) => {
    const dispatch = useAppDispatch();
    const { title, description, titleError, descriptionError, dueDateError, isLoading, error } =
        useSelector((state: RootState) => state.addTodoForm);

    const theme = useTheme();
    const styles = getAddTodoFormStyles({ theme });
    const intl = useIntl();
    const [createTodo] = useCreateTodoMutation();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    const handleTitleChange = (text: string) => dispatch(addTodoActions.setTitleAction(text));

    const handleDescriptionChange = (text: string) =>
        dispatch(addTodoActions.setDescriptionAction(text));

    const handleAddTodo = async () => {
        if (!title.trim() || titleError || descriptionError || dueDateError) {
            return;
        }
        try {
            dispatch(addTodoActions.setIsLoadingAction(true));
            await createTodo({
                title,
                description: description || undefined,
                dueDate: selectedDate?.toISOString() || undefined,
            }).unwrap();
            dispatch(addTodoActions.setClearFormAction());
            setSuccessModalVisible(true); // Show the success modal
        } catch (err) {
            console.error(err);
            dispatch(addTodoActions.setIsLoadingAction(false));
            dispatch(addTodoActions.setErrorAction("addTodo.error"));
            setErrorModalVisible(true); // Show the error modal
        }
    };

    const handleCloseErrorModal = () => {
        setErrorModalVisible(false);
        dispatch(addTodoActions.setErrorAction(null)); // Clear the error in the store
    };

    const handleCloseSuccessModal = () => {
        setSuccessModalVisible(false);
    };

    return (
        <>
            <ScrollableFormContainer>
                <View style={styles.container}>
                    {/* Title Section */}
                    <ThemedText variant="title" align="center" style={styles.title}>
                        <FormattedMessage id="addTodo.title" />
                    </ThemedText>
                    <ThemedText variant="subtitle" align="center" style={styles.subtitle}>
                        <FormattedMessage id="addTodo.subtitle" />
                    </ThemedText>

                    {/* Input Fields */}
                    <View style={styles.inputContainer}>
                        <InputTextField
                            label="addTodo.title.label"
                            placeholder="addTodo.title.placeholder"
                            fullWidth
                            onChangeText={handleTitleChange}
                            testID="todo-title-input"
                            errorText={titleError ? titleError : undefined}
                            value={title}
                        />
                        <InputTextAreaField
                            label="addTodo.description.label"
                            placeholder="addTodo.description.placeholder"
                            fullWidth
                            onChangeText={handleDescriptionChange}
                            testID="todo-description-input"
                            errorText={descriptionError ? descriptionError : undefined}
                            value={description}
                        />
                        <DatePickerField
                            label="addTodo.dueDate.label"
                            placeholder="addTodo.dueDate.placeholder"
                            selectedDate={selectedDate}
                            onOpenCalendar={openCalendar}
                            errorText={dueDateError ? dueDateError : undefined}
                        />
                    </View>

                    {/* Add Todo Button */}
                    <View style={styles.buttonContainer}>
                        <RoundedButton
                            text={
                                isLoading
                                    ? intl.formatMessage({ id: "addTodo.button.inProgress" })
                                    : intl.formatMessage({ id: "addTodo.button" })
                            }
                            disabled={isLoading || !title.trim()}
                            onPress={handleAddTodo}
                            testID="add-todo-button"
                        />
                    </View>
                </View>
            </ScrollableFormContainer>

            {/* Error Modal */}
            <ConfirmationModal
                visible={errorModalVisible}
                title={intl.formatMessage({ id: "addTodo.error.title" })}
                message={intl.formatMessage({ id: "addTodo.error" })}
                confirmText={intl.formatMessage({ id: "addTodo.error.confirmText" })}
                onConfirm={handleCloseErrorModal}
            />

            {/* Success Modal */}
            <ConfirmationModal
                visible={successModalVisible}
                title={intl.formatMessage({ id: "addTodo.success.title" })}
                message={intl.formatMessage({ id: "addTodo.success.message" })}
                confirmText={intl.formatMessage({ id: "addTodo.success.confirmText" })}
                onConfirm={handleCloseSuccessModal}
            />
        </>
    );
};

const AddTodoForm = withCalendarModal(AddTodoFormNoEnhanced);
AddTodoFormNoEnhanced.displayName = "AddTodoFormNoEnhanced";

export { AddTodoForm };
