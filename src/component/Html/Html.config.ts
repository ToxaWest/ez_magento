import { attributesToProps } from 'html-react-parser';

interface attribsInterface { [key: string]: string | number | undefined }

const attributesToPropsWidget = (attribs:attribsInterface) => {
    if (!attribs) {
        return {};
    }
    const toCamelCase = (string: string) => string
        .replace(/_[a-z]/g, (match) => match.substr(1).toUpperCase());

    const convertPropertiesToValidFormat = (properties: attribsInterface) => Object.entries(properties)
        .reduce((validProps, [key, value]) => {
            // eslint-disable-next-line no-restricted-globals
            if (!isNaN(value as number)) {
                return { ...validProps, [toCamelCase(key)]: +value };
            }

            return { ...validProps, [toCamelCase(key)]: value };
        }, {});

    const properties = convertPropertiesToValidFormat(attribs);
    return attributesToProps(properties);
};

// eslint-disable-next-line import/prefer-default-export
export { attributesToPropsWidget };
