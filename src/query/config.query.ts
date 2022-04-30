import { gql } from '@apollo/client';
import {
    availableStores, categoryMenuFragment, config, countries, country, menu
} from '@gql/index';

const configQuery = {
    availableStores: gql`
        ${availableStores}
    `,
    config: gql`
        ${categoryMenuFragment}
        ${config}
    `,
    countries: gql`
        ${countries}
    `,
    country: gql`
        ${country}
    `,
    menu: gql`
        ${menu}
    `
};

export default configQuery;
