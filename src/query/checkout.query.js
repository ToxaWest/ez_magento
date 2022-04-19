import { gql } from '@apollo/client';

import {
    cartFragment,
    estimateShippingCosts, placeOrder,
    price_range,
    priceFragment, setBillingAddressOnCart, setPaymentMethodOnCart,
    setShippingAddressesOnCart,
    setShippingMethodsOnCart
} from 'Graphql/index';

const CheckoutQuery = {
    estimateShippingCosts: gql`
        ${estimateShippingCosts}
    `,
    setShippingAddressesOnCart: gql`
        ${price_range}
        ${priceFragment}
        ${cartFragment}
        ${setShippingAddressesOnCart}
    `,
    setShippingMethodsOnCart: gql`
        ${price_range}
        ${priceFragment}
        ${cartFragment}
        ${setShippingMethodsOnCart}
    `,
    setBillingAddressOnCart: gql`
        ${price_range}
        ${priceFragment}
        ${cartFragment}
        ${setBillingAddressOnCart}
    `,
    setPaymentMethodOnCart: gql`
        ${price_range}
        ${priceFragment}
        ${cartFragment}
        ${setPaymentMethodOnCart}
    `,
    placeOrder: gql`
        ${placeOrder}
    `
};

export default CheckoutQuery;
