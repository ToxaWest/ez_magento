import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface accountReducerInterface {
    customer?: {
        firstname: string,
        lastname?: string,
        date_of_birth?: string,
        email: string,
        wishlist: {
            id,
            items_count: number
        },
    },
    isSignedIn: boolean,

    loading: boolean
}

export const accountReducer = createSlice({
    initialState: {
        customer: {
            firstname: '',
            lastname: '',
            date_of_birth: '',
            email: '',
            wishlist: {
                id: 0,
                items_count: 0
            }
        },
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
        logOutCustomer: (state) => {
            state.customer = {
                firstname: '',
                lastname: '',
                date_of_birth: '',
                email: '',
                wishlist: {
                    id: 0,
                    items_count: 0
                }
            };
            state.isSignedIn = false;
            state.loading = false;
        },
        updateCustomerLoadingStatus: (state, { payload }) => {
            state.loading = payload;
        },
        updateWishListItemsCount: (state, { payload }: PayloadAction<number>) => {
            state.customer.wishlist.items_count = payload;
        }
    }
});

export const {
    logOutCustomer,
    updateCustomer,
    updateCustomerLoadingStatus,
    updateWishListItemsCount
} = accountReducer.actions;

export default accountReducer.reducer;
