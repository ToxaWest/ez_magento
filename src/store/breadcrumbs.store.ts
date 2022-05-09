import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    _normalizeBreadcrumb,
    getProductsBreadcrumbs
} from '@util/Breadcrumbs';

export interface breadcrumbsInterface {
    breadcrumbs: BreadcrumbInterface[],
    current: BreadcrumbInterface,
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
        }
    },
    extraReducers: {
        'products/updateSingleProduct': (state, {
            payload: { categories, name, url }
        }: PayloadAction<ProductInterface>) => {
            state.breadcrumbs = getProductsBreadcrumbs(categories);
            state.showBreadcrumbs = true;
            state.current = {
                name,
                url
            };
        },
        'category/updateCategory': (state, {
            payload: { breadcrumbs, name, url }
        }: PayloadAction<CategoryInterface>) => {
            state.breadcrumbs = _normalizeBreadcrumb(breadcrumbs);
            state.showBreadcrumbs = true;
            state.current = {
                name,
                url
            };
        }
        // 'blog/updateBlogCategory': (state, {
        //     payload: {
        //         breadcrumbs, title: name, category_url: url
        //     }
        // }: PayloadAction<object>) => {
        //     state.breadcrumbs = breadcrumbs.map(({ category_name, category_url_path }) => ({
        //         name: category_name,
        //         url: category_url_path
        //     }));
        //     state.showBreadcrumbs = true;
        //     state.current = {
        //         name,
        //         url
        //     };
        // }
    }
});

export const {
    hideBreadcrumbs
} = breadcrumbsReducer.actions;

export default breadcrumbsReducer.reducer;
