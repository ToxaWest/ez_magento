import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    _normalizeBreadcrumb,
    getProductsBreadcrumbs
} from '@util/Breadcrumbs';

export interface breadcrumbInterface {
    url: string,
    name: string
}

export interface breadcrumbsInterface {
    breadcrumbs: Array<breadcrumbInterface>,
    current: breadcrumbInterface,
    showBreadcrumbs: boolean
}

const getInitialState = () => {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return window.__NEXT_DATA__.props.pageProps.state.breadcrumbs as breadcrumbsInterface;
    }

    return {
        breadcrumbs: [],
        current: {
            name: '',
            url: ''
        },
        showBreadcrumbs: false
    };
};

export const breadcrumbsReducer = createSlice({
    initialState: getInitialState(),
    name: 'breadcrumbs',
    reducers: {
        hideBreadcrumbs: (state) => {
            state.showBreadcrumbs = false;
        },
        updateCategoryBreadcrumbs: (state, {
            payload: {
                name,
                breadcrumbs,
                url
            }
        }: PayloadAction<CategoryInterface>) => {
            state.breadcrumbs = _normalizeBreadcrumb(breadcrumbs);
            state.showBreadcrumbs = true;
            state.current = {
                name,
                url
            };
        },
        updateProductsBreadcrumbs: (state, {
            payload: {
                name,
                categories,
                url
            }
        }: PayloadAction<ProductInterface>) => {
            state.breadcrumbs = getProductsBreadcrumbs(categories);
            state.showBreadcrumbs = true;
            state.current = {
                name,
                url
            };
        }
    }
});

export const {
    updateProductsBreadcrumbs,
    updateCategoryBreadcrumbs,
    hideBreadcrumbs
} = breadcrumbsReducer.actions;

export default breadcrumbsReducer.reducer;
