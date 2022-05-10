import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface productsReducerInterface {
    configurableIndex: number,
    productList: {
        items: ProductInterface[]
    },
    productsInformation: ProductsInformationInterface,
    selectedBundleOptions: { [key: string]: string | string[] },
    singleProduct: ProductInterface
}

const getInitialState = (): productsReducerInterface => {
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
            page_info: { total_pages: 0 },
            total_count: 0,
            sort_fields: {
                default: '',
                options: []
            }
        },
        configurableIndex: -1,
        selectedBundleOptions: {},
        singleProduct: {
            __typename: 'SimpleProduct',
            id: 0,
            name: '',
            sku: '',
            s_attributes: [],
            categories: [],
            media_gallery: [],
            url: '',
            small_image: { label: '', url: '' },
            price_range: {
                minimum_price: { final_price: { currency: '', value: 0 } },
                maximum_price: { discount: { percent_off: 0 }, final_price: { currency: '', value: 0 } }
            },
            related_products: []
        }
    };
};

export const productsReducer = createSlice({
    initialState: getInitialState(),
    name: 'products',
    reducers: {
        updateProductList: (
            state: productsReducerInterface,
            { payload }: PayloadAction<{ items: ProductInterface[] }>
        ) => {
            state.productList = payload;
        },
        updateProductsInformation: (
            state: productsReducerInterface,
            { payload }: PayloadAction<ProductsInformationInterface>
        ) => {
            state.productsInformation = payload;
        },
        updateSingleProduct: (
            state: productsReducerInterface,
            { payload }: PayloadAction<ProductInterface>
        ) => {
            state.singleProduct = payload;
        },
        updateBundleSelectedOptions: (state, { payload }: PayloadAction<{ [key: string]: string | string[] }>) => {
            state.selectedBundleOptions = {
                ...state.selectedBundleOptions,
                ...payload
            };
        },
        updateConfigurableIndex: (state, { payload }: PayloadAction<number>) => {
            state.configurableIndex = payload;
        }
    }
});

export const {
    updateBundleSelectedOptions,
    updateConfigurableIndex,
    updateProductList,
    updateProductsInformation,
    updateSingleProduct
} = productsReducer.actions;

export default productsReducer.reducer;
