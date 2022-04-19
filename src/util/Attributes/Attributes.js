// eslint-disable-next-line import/prefer-default-export
export const getAttributeValue = ({ attribute_type, attribute_value, attribute_options }) => {
    if (attribute_type === 'text') {
        return attribute_value;
    }

    if (attribute_type === 'select') {
        return attribute_options.find(({ value }) => value === attribute_value).label;
    }

    if (attribute_type === 'boolean') {
        return attribute_value ? 'Yes' : 'No';
    }

    if (attribute_type === 'multiselect') {
        const options = attribute_value.split(',');
        return attribute_options.reduce((acc, { label, value }) => {
            if (options.some((a) => a === value)) {
                return `${acc + label }, `;
            }

            return acc;
        }, '');
    }

    if (attribute_type === 'price') {
        return attribute_value;
    }

    // eslint-disable-next-line no-console
    console.log(`Attribute type not rendered: ${ attribute_type}`);
    return '';
};
