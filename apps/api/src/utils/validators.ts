interface ValidationField {
    name: string;
    value: any;
    isOptional?: boolean;
    customValidator?: () => boolean | string; // Returns true if valid, string with error message if invalid
}

interface ValidationResult {
    isValid: boolean;
    errors: { [key: string]: string };
}

const validateFields = (fields: ValidationField[]): ValidationResult => {
    const errors: { [key: string]: string } = {};

    fields.forEach(({ name, value, isOptional = false, customValidator }) => {
        if (!isOptional && (value === undefined || value === null || value === "")) {
            errors[name] = `${name} is required`;
        } else if (customValidator && value !== undefined && value !== null) {
            const validationResult = customValidator();
            if (validationResult !== true) {
                errors[name] = validationResult as string; // Assume the error message is returned
            }
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

const validators = {
    validateFields,
};

export type { ValidationField, ValidationResult };

export { validators };
