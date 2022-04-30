import { ApolloQueryResult, useLazyQuery, useQuery } from '@apollo/client';
import { PHONE_TYPE, SELECT_TYPE } from '@component/Field/Field.config';
import ConfigQuery from '@query/config.query';
import { RootState } from '@store/index';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface countryInterface {
    is_state_required: boolean,
    available_regions: {
        id: string, name: string
    }[]
}

export interface countriesInterface {
    id: number,
    full_name_locale: string
}

export interface useUserAddressInterface {
    fields?: { [key: string]: { [key: string]: string | number } },
    options?: object
}

const useUserAddress = ({ fields }: useUserAddressInterface) => {
    const {
        default_country,
        address_lines_quantity,
        region_display_all
    } = useSelector((state: RootState) => state.config.config);
    const [loadRegions] = useLazyQuery(ConfigQuery.country);
    const { data: { countries } } = useQuery<{ countries: countriesInterface[] }>(ConfigQuery.countries);
    const [country_id, onCountryChange] = useState(default_country);
    const [{
        available_regions,
        is_state_required
    }, setAvailableRegions] = useState<countryInterface>(
        {
            is_state_required: false,
            available_regions: []
        }
    );

    useEffect(() => {
        setAvailableRegions({
            is_state_required: false,
            available_regions: []
        });
        if (country_id) {
            loadRegions({ variables: { id: country_id } })
                .then(({ data: { country } }:
                    ApolloQueryResult<{ country: countryInterface }>) => setAvailableRegions(country))
                .catch(() => {});
        }
    }, [country_id]);

    const getStreetFields = () => new Array({ length: address_lines_quantity })
        .fill('')
        .reduce((acc, key, index) => ({
            ...acc,
            [`street${index}`]: {
                label: `street ${index + 1}`,
                validation: index === 0 ? ['notEmpty'] : []
            }
        }), {});

    const getRegionFields = () => {
        if (!region_display_all && !is_state_required) {
            return null;
        }

        if (!available_regions || !available_regions.length) {
            return {
                region: {
                    label: 'State',
                    validation: is_state_required ? ['notEmpty'] : []
                }
            };
        }

        return {
            region_id: {
                label: 'State',
                autocomplete: true,
                placeholder: 'Select region',
                options: available_regions.map(({
                    id,
                    name
                }) => ({
                    id,
                    label: name,
                    value: id
                })),
                type: SELECT_TYPE,
                validation: is_state_required ? ['notEmpty', 'autocomplete'] : []
            }
        };
    };

    const getCountryField = () => {
        if (!countries.length) {
            return {};
        }

        return {
            country_code: {
                label: 'Country',
                defaultValue: country_id,
                autocomplete: true,
                placeholder: 'Select country',
                onChange: onCountryChange,
                options: countries
                    .filter(({
                        id,
                        full_name_locale
                    }) => id && full_name_locale)
                    .map(({
                        id,
                        full_name_locale
                    }) => ({
                        id,
                        label: full_name_locale,
                        value: id
                    })),
                validation: ['notEmpty', 'autocomplete'],
                type: SELECT_TYPE
            }
        };
    };

    return {
        firstname: {
            group: 'user',
            validation: ['notEmpty'],
            label: 'firstname'
        },
        lastname: {
            group: 'user',
            validation: ['notEmpty'],
            label: 'lastname'
        },
        telephone: {
            group: 'user',
            validation: ['notEmpty'],
            label: 'telephone',
            type: PHONE_TYPE
        },
        ...getCountryField(),
        ...getRegionFields(),
        city: {
            validation: ['notEmpty'],
            label: 'city'
        },
        postcode: {
            validation: ['notEmpty'],
            label: 'postcode'
        },
        ...getStreetFields(),
        ...fields
    } as { [key: string] : object };
};

useUserAddress.defaultProps = {
    fields: {},
    options: {
        values: {}
    }
};

export default useUserAddress;
