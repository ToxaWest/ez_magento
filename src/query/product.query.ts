import { gql } from '@apollo/client';
import {
    price_range, priceFragment, product, productList, productListInformation
} from '@graphql/index';

const productQuery = {
    product: gql`
        ${priceFragment}
        ${price_range}
        ${product}
    `,
    productList: gql`
        ${priceFragment}
        ${price_range}
        ${productList}
    `,
    productListInformation: gql`
        ${productListInformation}
    `
};

export default productQuery;
