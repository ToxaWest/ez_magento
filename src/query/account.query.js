import { gql } from '@apollo/client';

import { customer, customerOrders, generateCustomerToken } from 'Graphql/index';

const accountQuery = {
    customer: gql`
        ${customer}
    `,
    customerOrders: gql`
        ${customerOrders}
    `,
    generateCustomerToken: gql`
        ${generateCustomerToken}
    `
};

export default accountQuery;
