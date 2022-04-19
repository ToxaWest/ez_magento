import { attributesToProps } from 'html-react-parser';

const attributesToPropsWidget = (attribs) => {
    if (!attribs) {
        return {};
    }
    const toCamelCase = (string) => string.replace(/_[a-z]/g, (match) => match.substr(1).toUpperCase());

    const convertPropertiesToValidFormat = (properties) => Object.entries(properties)
        .reduce((validProps, [key, value]) => {
            // eslint-disable-next-line no-restricted-globals
            if (!isNaN(value)) {
                return { ...validProps, [toCamelCase(key)]: +value };
            }

            return { ...validProps, [toCamelCase(key)]: value };
        }, {});

    const properties = convertPropertiesToValidFormat(attribs);
    return attributesToProps(properties);
};

// eslint-disable-next-line import/prefer-default-export
export { attributesToPropsWidget };
