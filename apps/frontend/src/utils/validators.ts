import { defineMessages } from "react-intl";

export const messages = defineMessages({
    emailInvalid: {
        id: "form.email.invalid",
        defaultMessage: "Whoops! That doesn't look like a valid email. Try again.",
    },
    passwordTooShort: {
        id: "form.password.tooShort",
        defaultMessage: "Passwords must be at least 8 characters. Let's make it strong!",
    },
    nameTooShort: {
        id: "form.name.tooShort",
        defaultMessage: "The name must be at least 2 characters long.",
    },
    requiredField: {
        id: "form.required",
        defaultMessage: "This field is required.",
    },
    titleTooShort: {
        id: "form.title.tooShort",
        defaultMessage: "The title must be at least 3 characters long.",
    },
    titleTooLong: {
        id: "form.title.tooLong",
        defaultMessage: "The title must not exceed 50 characters.",
    },
    descriptionTooShort: {
        id: "form.description.tooShort",
        defaultMessage: "The description must be at least 10 characters long.",
    },
    descriptionTooLong: {
        id: "form.description.tooLong",
        defaultMessage: "The description must not exceed 300 characters.",
    },
    dueDateInvalid: {
        id: "form.dueDate.invalid",
        defaultMessage: "The due date cannot be in the past.",
    },
});

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password: string) => password.length >= 8;
const isValidName = (name: string) => name.trim().length >= 2;

const isValidEmailWithMessage = (email: string) => {
    return isValidEmail(email)
        ? { valid: true }
        : { valid: false, error: messages.emailInvalid.id };
};

const isValidPasswordWithMessage = (password: string) => {
    return isValidPassword(password)
        ? { valid: true }
        : { valid: false, error: messages.passwordTooShort.id };
};

const isValidNameWithMessage = (name: string) => {
    return isValidName(name) ? { valid: true } : { valid: false, error: messages.nameTooShort.id };
};

const validateRequiredWithMessage = (value: string) => {
    return value.trim() ? { valid: true } : { valid: false, error: messages.requiredField.id };
};

const isValidTitle = (title: string) => title.trim().length >= 3 && title.trim().length <= 50;

const isValidTitleWithMessage = (title: string) => {
    if (title.trim().length < 3) {
        return { valid: false, error: messages.titleTooShort.id };
    }
    if (title.trim().length > 50) {
        return { valid: false, error: messages.titleTooLong.id };
    }
    return { valid: true };
};

const isValidDescription = (description: string) =>
    description.trim().length >= 10 && description.trim().length <= 300;

const isValidDescriptionWithMessage = (description: string) => {
    if (description.trim().length < 10) {
        return { valid: false, error: messages.descriptionTooShort.id };
    }
    if (description.trim().length > 300) {
        return { valid: false, error: messages.descriptionTooLong.id };
    }
    return { valid: true };
};

const isValidDueDate = (dueDate?: Date) => {
    if (!dueDate) return true; // Undefined is valid as it's optional
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight
    return dueDate >= today;
};

const isValidDueDateWithMessage = (dueDate?: Date) => {
    return isValidDueDate(dueDate)
        ? { valid: true }
        : { valid: false, error: messages.dueDateInvalid.id };
};

export const validators = {
    isValidEmail,
    isValidPassword,
    isValidName,
    isValidEmailWithMessage,
    isValidPasswordWithMessage,
    isValidNameWithMessage,
    validateRequiredWithMessage,
    isValidTitle,
    isValidTitleWithMessage,
    isValidDescription,
    isValidDescriptionWithMessage,
    isValidDueDate,
    isValidDueDateWithMessage,
};
