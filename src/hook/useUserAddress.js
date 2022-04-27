import { useLazyQuery, useQuery } from '@apollo/client';
import { PHONE_TYPE, SELECT_TYPE } from '@component/Field/Field.config';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ConfigQuery from 'Query/config.query';

const useUserAddress = ({ fields }) => {
    const {
        default_country, address_lines_quantity, region_display_all
    } = useSelector((state) => state.config.config);
    const [loadRegions] = useLazyQuery(ConfigQuery.country);
    const { data: { countries } = { countries: [] } } = useQuery(ConfigQuery.countries);
    const [country_id, onCountryChange] = useState(default_country);
    const [{ available_regions, is_state_required }, setAvailableRegions] = useState({});
    useEffect(() => {
        setAvailableRegions({});
        if (country_id) {
            loadRegions({ variables: { id: country_id } })
                .then(({ data: { country } }) => setAvailableRegions(country));
        }
    }, [country_id]);

    const getStreetFields = () => new Array(address_lines_quantity)
        .fill('')
        .reduce((acc, key, index) => ({
            ...acc,
            [`street${index}`]: { label: `street ${ index + 1}`, validation: index === 0 ? ['notEmpty'] : [] }
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
                options: available_regions.map(({ id, name }) => ({ id, label: name, value: id })),
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
                    .filter(({ id, full_name_locale }) => id && full_name_locale)
                    .map(({ id, full_name_locale }) => ({ id, label: full_name_locale, value: id })),
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
    };
};

useUserAddress.defaultProps = {
    fields: {},
    options: {
        values: {}
    }
};

useUserAddress.propTypes = {
    fields: PropTypes.shape({ [PropTypes.string]: PropTypes.shape({}) }),
    options: PropTypes.shape({})
};

export default useUserAddress;
