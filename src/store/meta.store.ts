import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MetaInterface {
    meta_description?: string,
    meta_keyword?: string,
    meta_title?: string,
    title?: string
}

const getInitialState = () => {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return window.__NEXT_DATA__.props.pageProps.state.meta as MetaInterface;
    }

    return {
        meta_title: '',
        title: '',
        meta_description: '',
        meta_keyword: ''
    };
};

export const metaReducer = createSlice({
    initialState: getInitialState(),
    name: 'meta',
    reducers: {
        updateMeta: (state, {
            payload: {
                meta_description,
                meta_keyword,
                meta_title,
                title
            }
        }: PayloadAction<MetaInterface>) => {
            state.title = title;
            state.meta_title = meta_title;
            state.meta_description = meta_description;
            state.meta_keyword = meta_keyword;
        }
    },
    extraReducers: {
        'products/updateSingleProduct': (state, {
            payload: {
                meta_description, meta_keyword, meta_title, name
            }
        }) => {
            state.title = name;
            state.meta_title = meta_title;
            state.meta_description = meta_description;
            state.meta_keyword = meta_keyword;
        },
        'category/updateCategory': (state, {
            payload: {
                meta_description, meta_keyword, meta_title, name
            }
        }) => {
            state.title = name;
            state.meta_title = meta_title;
            state.meta_description = meta_description;
            state.meta_keyword = meta_keyword;
        },
        'cms/updatePage': (state, {
            payload: {
                meta_description, meta_keyword, meta_title, title
            }
        }) => {
            state.title = title;
            state.meta_title = meta_title;
            state.meta_description = meta_description;
            state.meta_keyword = meta_keyword;
        },
        'blog/updateBlogCategory': (state, {
            payload: {
                meta_description, meta_keyword, meta_title, title
            }
        }) => {
            state.title = title;
            state.meta_title = meta_title;
            state.meta_description = meta_description;
            state.meta_keyword = meta_keyword;
        }
    }
});
export const { updateMeta } = metaReducer.actions;

export default metaReducer.reducer;
