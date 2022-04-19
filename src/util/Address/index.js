export const setAddressesInFormObject = (fields = {}, numberOfLines = 1) => {
    const addressKeys = new Array(numberOfLines)
        .fill('')
        .map((_, index) => `street${index}`);

    const addressValues = addressKeys.map((key) => fields[key]);

    // removing street related fields from the form object
    const newFields = Object.keys(fields)
        .filter((key) => !addressKeys.includes(key))
        .reduce(
            (acc, key) => {
                acc[key] = fields[key];

                return acc;
            }, {}
        );

    const isStreetArray = addressValues.some((item) => item);
    if (isStreetArray) {
        // setting single street entry to the form object
        newFields.street = addressValues;
    }

    return newFields;
};

export const _normalizeStreetFields = (street = []) => street.reduce(
    (acc, value, index) => ({ ...acc, [`street${index}`]: value }), {}
);

export const _normalizeRegion = (region = {}) => {
    const { region_id, label } = region;
    if (region_id) {
        return { region_id };
    }

    return { region: label };
};

export const _normalizeAddressAsMagentoStyle = (initial = {}) => {
    const {
        selected_shipping_method,
        available_shipping_methods,
        __typename,
        street,
        country,
        region,
        ...address
    } = initial;

    return {
        country_code: country?.code,
        ..._normalizeStreetFields(street),
        ..._normalizeRegion(region),
        ...address
    };
};
