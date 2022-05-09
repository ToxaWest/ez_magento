import { createSlice } from '@reduxjs/toolkit';

export interface SelectedShippingMethodInterface { carrier_code: string, method_code: string }

interface cartReducerInterface {
    cart: {
        isVirtual: boolean,
        items: {
            id: string,
            product: ProductInterface,
            quantity: number,
            configurable_options?: {
                option_label: string
                value_label: string
            }[]
            __typename: 'SimpleCartItem' | 'ConfigurableCartItem'
        }[],
        prices: {
            grand_total: {
                currency: string
            }
        },
        shipping_addresses?: {
            selected_shipping_method?: SelectedShippingMethodInterface,
            available_shipping_methods?: {
                method_code: string,
                method_title: string,
                carrier_title: string,
                amount: {
                    value: number,
                    currency: string
                },
                carrier_code: string
            }[]
        }[],
        selected_payment_method?: { code: string },
        available_payment_methods: object[],
        billing_address?: object,
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
