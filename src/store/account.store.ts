import { createSlice } from '@reduxjs/toolkit';

interface accountReducerInterface {
    customer?: {
        firstname: string
    },
    isSignedIn: boolean,
    loading: boolean
}

export const accountReducer = createSlice({
    initialState: {
        customer: {},
        isSignedIn: false,
        loading: true
    } as accountReducerInterface,
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
