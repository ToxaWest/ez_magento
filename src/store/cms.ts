import { createSlice } from '@reduxjs/toolkit';

interface cmsReducerInterface {
    block: object,
    page: {
        content?: string
    }
}

const getInitialState = () => {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return window.__NEXT_DATA__.props.pageProps.state.cms as cmsReducerInterface;
    }

    return {
        block: {},
        page: {}
    } as cmsReducerInterface;
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
