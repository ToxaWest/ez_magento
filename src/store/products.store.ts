import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface productsReducerInterface {
    productList: {
        items: ProductInterface[]
    },
    productsInformation: ProductsInformationInterface,
    singleProduct: ProductInterface
}

const getInitialState = () => {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return window.__NEXT_DATA__.props.pageProps.state.products as productsReducerInterface;
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
    initialState: getInitialState() as productsReducerInterface,
    name: 'products',
    reducers: {
        updateProductList: (state: productsReducerInterface, action) => {
            state.productList = action.payload;
        },
        updateProductsInformation: (
            state: productsReducerInterface,
            { payload }: PayloadAction<ProductsInformationInterface>
        ) => {
            state.productsInformation = payload;
        },
        updateSingleProduct: (state: productsReducerInterface, { payload }) => {
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
