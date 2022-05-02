export interface fieldsInterface { [key: string]: string | boolean | number | string[] | object }

export const setAddressesInFormObject = (fields: fieldsInterface, numberOfLines = 1) => {
    const addressKeys = new Array(numberOfLines)
        .fill('')
        .map((_, index) => `street${index}`);

    const addressValues = addressKeys.map((key) => fields[key]);

    // removing street related fields from the form object
    const newFields = Object.keys(fields)
        .filter((key) => !addressKeys.includes(key))
        .reduce((acc, key) => {
            acc[key] = fields[key];

            return acc;
        }, {}) as { [key: string] : string | string[] };

    const isStreetArray = addressValues.some((item) => item);
    if (isStreetArray) {
    // setting single street entry to the form object
        newFields.street = addressValues as string[];
    }

    return newFields;
};

interface _normalizeStreetFieldsInterface {
    [key: string]: string
}

export const _normalizeStreetFields = (street:
    _normalizeStreetFieldsInterface[]) => (street || []).reduce((acc, value, index) => (
    { ...acc, [`street${index}`]: value }
), {});

interface _normalizeRegionInterface {
    region_id?:number,
    label:string
}

export const _normalizeRegion = (region: _normalizeRegionInterface = { region_id: null, label: '' }) => {
    const { region_id, label } = region;
    if (region_id) {
        return { region_id };
    }

    return { region: label };
};

export interface _normalizeAddressAsMagentoStyleInterface {
    selected_shipping_method?,
    available_shipping_methods?,
    __typename?: string,
    street?: _normalizeStreetFieldsInterface[],
    country?:{
        code: string
    },
    region?:_normalizeRegionInterface,
}

export const _normalizeAddressAsMagentoStyle = (initial: _normalizeAddressAsMagentoStyleInterface) => {
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
    } as object;
};
