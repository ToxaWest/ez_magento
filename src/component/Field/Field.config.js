export const TEXT_TYPE = 'text';
export const SELECT_TYPE = 'select';
export const HIDDEN_TYPE = 'hidden';
export const PHONE_TYPE = 'tel';
export const CHECKBOX_TYPE = 'checkbox';

export const composeValidation = (r, value, d, s, options) => {
    const validations = {
        notEmpty: () => ((typeof value !== 'undefined' && value.length) ? undefined : 'required'),
        autocomplete: () => (options.some(
            ({ value: oValue }) => oValue === value
        ) ? undefined : 'please select option')
    };

    const error = r.find((e) => validations[e]() !== undefined);

    if (error) {
        return validations[error]();
    }

    return undefined;
};
