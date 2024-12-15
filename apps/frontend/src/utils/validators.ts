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

export const validators = {
    isValidEmail,
    isValidPassword,
    isValidName,
    isValidEmailWithMessage,
    isValidPasswordWithMessage,
    isValidNameWithMessage,
    validateRequiredWithMessage,
};
