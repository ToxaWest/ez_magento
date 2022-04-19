import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
    if (typeof window !== 'undefined') {
        return window.__NEXT_DATA__.props.pageProps.state.cms;
    }

    return {
        block: {},
        page: {}
    };
};

export const cmsReducer = createSlice({
    initialState: getInitialState(),
    name: 'cms',
    reducers: {
        updatePage: (state, action) => {
            state.page = action.payload;
        }
    }
});

export const { updatePage } = cmsReducer.actions;

export default cmsReducer.reducer;
