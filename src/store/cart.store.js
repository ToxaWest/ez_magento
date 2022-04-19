import { createSlice } from '@reduxjs/toolkit';

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
    },
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
