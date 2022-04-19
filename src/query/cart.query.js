import { gql } from '@apollo/client';

import {
    addSimpleProductsToCart,
    cart,
    cartFragment,
    createEmptyCart,
    mergeCarts,
    price_range,
    priceFragment,
    removeItemFromCart
} from 'Graphql/index';

const cartQuery = {
    addSimpleProductsToCart: gql`
        ${priceFragment}
        ${price_range}
        ${cartFragment}
        ${addSimpleProductsToCart}
    `,
    cart: gql`
        ${priceFragment}
        ${price_range}
        ${cartFragment}
        ${cart}
    `,
    createEmptyCart: gql`
        ${createEmptyCart}
    `,
    mergeCarts: gql`
        ${priceFragment}
        ${price_range}
        ${cartFragment}
        ${mergeCarts}
    `,
    removeItemFromCart: gql`
        ${priceFragment}
        ${price_range}
        ${cartFragment}
        ${removeItemFromCart}
    `
};

export default cartQuery;
