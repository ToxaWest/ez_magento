import { gql } from '@apollo/client';
import {
    addProductsToCart,
    cart,
    cartFragment,
    createEmptyCart,
    mergeCarts,
    price_range,
    priceFragment,
    removeItemFromCart
} from '@graphql/index';

const cartQuery = {
    addProductsToCart: gql`
        ${priceFragment}
        ${price_range}
        ${cartFragment}
        ${addProductsToCart}
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
