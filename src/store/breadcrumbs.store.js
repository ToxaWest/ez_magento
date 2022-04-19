import { createSlice } from '@reduxjs/toolkit';

import {
    _normalizeBreadcrumb,
    getProductsBreadcrumbs
} from 'Util/Breadcrumbs';

const getInitialState = () => {
    if (typeof window !== 'undefined') {
        return window.__NEXT_DATA__.props.pageProps.state.breadcrumbs;
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
        updateCategoryBreadcrumbs: (state, { payload: { name, breadcrumbs, url } }) => {
            state.breadcrumbs = _normalizeBreadcrumb(breadcrumbs);
            state.showBreadcrumbs = true;
            state.current = {
                name,
                url
            };
        },
        updateProductsBreadcrumbs: (state, { payload: { name, categories, url } }) => {
            state.breadcrumbs = getProductsBreadcrumbs(categories);
            state.showBreadcrumbs = true;
            state.current = {
                name,
                url
            };
        }
    }
});

export const { updateProductsBreadcrumbs, updateCategoryBreadcrumbs, hideBreadcrumbs } = breadcrumbsReducer.actions;

export default breadcrumbsReducer.reducer;
