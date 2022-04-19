import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
    if (typeof window !== 'undefined') {
        return window.__NEXT_DATA__.props.pageProps.state.products;
    }

    return {
        productList: {
            items: []
        },
        productsInformation: {
            aggregations: [],
            sort_fields: {
                default: '',
                options: []
            }
        },
        singleProduct: {}
    };
};

export const productsReducer = createSlice({
    initialState: getInitialState(),
    name: 'products',
    reducers: {
        updateProductList: (state, action) => {
            state.productList = action.payload;
        },
        updateProductsInformation: (state, { payload }) => {
            state.productsInformation = payload;
        },
        updateSingleProduct: (state, { payload }) => {
            state.singleProduct = payload;
        }
    }
});

export const {
    updateProductList,
    updateProductsInformation,
    updateSingleProduct
} = productsReducer.actions;

export default productsReducer.reducer;
