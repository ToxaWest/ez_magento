import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
    if (typeof window !== 'undefined') {
        return window.__NEXT_DATA__.props.pageProps.state.category;
    }

    return {
        current: {}
    };
};

export const categoryReducer = createSlice({
    initialState: getInitialState(),
    name: 'category',
    reducers: {
        updateCategory: (state, action) => {
            state.current = action.payload;
        }
    }
});

export const { updateCategory } = categoryReducer.actions;

export default categoryReducer.reducer;
