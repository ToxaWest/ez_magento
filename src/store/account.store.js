import { createSlice } from '@reduxjs/toolkit';

export const accountReducer = createSlice({
    initialState: {
        customer: {},
        isSignedIn: false,
        loading: true
    },
    name: 'account',
    reducers: {
        updateCustomer: (state, { payload }) => {
            state.customer = payload;
            state.isSignedIn = true;
            state.loading = false;
        },
        updateCustomerLoadingStatus: (state, { payload }) => {
            state.loading = payload;
        }
    }
});

export const { updateCustomer, updateCustomerLoadingStatus } = accountReducer.actions;

export default accountReducer.reducer;
