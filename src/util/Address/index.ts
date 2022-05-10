export interface fieldsInterface { [key: string]: string | boolean | number | string[] | object }

export const setAddressesInFormObject = (fields: fieldsInterface, numberOfLines = 1): fieldsInterface => {
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

export const _normalizeStreetFields = (street: string[]): { [key: string]: string | null } => (street || [])
    .reduce((acc, value, index) => (
        { ...acc, [`street${index}`]: value }
    ), {});

interface _normalizeRegionInterface {
    label:string,
    region_id?:number
}

export const _normalizeRegion = (region: _normalizeRegionInterface = { region_id: null, label: '' }): {
    region?: string, region_id?:number
} => {
    const { label, region_id } = region;
    if (region_id) {
        return { region_id };
    }

    return { region: label };
};

export interface _normalizeAddressAsMagentoStyleInterface {
    __typename?: string,
    available_shipping_methods?,
    country?:{
        code: string
    },
    region?:_normalizeRegionInterface,
    selected_shipping_method?,
    street?: string[]
}

export function _normalizeAddressAsMagentoStyle(
    initial: _normalizeAddressAsMagentoStyleInterface
): { [key: string]: number | string | null | string[] } {
    if (!initial) {
        return null;
    }
    const {
        __typename,
        available_shipping_methods,
        country,
        region,
        selected_shipping_method,
        street,
        ...address
    } = initial;

    return {
        country_code: country?.code,
        ..._normalizeStreetFields(street),
        ..._normalizeRegion(region),
        ...address
    };
}
