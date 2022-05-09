import { createSlice } from '@reduxjs/toolkit';

export interface SelectedShippingMethodInterface { carrier_code: string, method_code: string }

interface cartReducerInterface {
    cart: {
        available_payment_methods: object[],
        billing_address?: object,
        isVirtual: boolean,
        items: {
            __typename: 'SimpleCartItem' | 'ConfigurableCartItem',
            configurable_options?: {
                option_label: string
                value_label: string
            }[],
            id: string,
            product: ProductInterface,
            quantity: number
        }[],
        prices: {
            grand_total: {
                currency: string
            }
        },
        selected_payment_method?: { code: string },
        shipping_addresses?: {
            available_shipping_methods?: {
                amount: {
                    currency: string,
                    value: number
                },
                carrier_code: string,
                carrier_title: string,
                method_code: string,
                method_title: string
            }[],
            selected_shipping_method?: SelectedShippingMethodInterface
        }[],
        total_quantity: number
    },
    loading: boolean
}

export const cartReducer = createSlice({
    initialState: {
        cart: {
            isVirtual: false,
            items: [],
            prices: {
                grand_total: {
                    currency: ''
                }
            },
            shipping_addresses: [{
                selected_shipping_method: null,
                available_shipping_methods: []
            }],
            available_payment_methods: [],
            billing_address: {},
            total_quantity: 0
        },
        loading: true
    } as cartReducerInterface,
    name: 'cart',
    reducers: {
        updateCart: (state, { payload }) => {
            state.cart = payload;
            state.loading = false;
        }
    }
});

export const { updateCart } = cartReducer.actions;

export default cartReducer.reducer;
