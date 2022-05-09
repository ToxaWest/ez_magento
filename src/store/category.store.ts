import { createSlice } from '@reduxjs/toolkit';

interface categoryReducerInterface {
    current: CategoryInterface
}

const getInitialState = () => {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return window.__NEXT_DATA__.props.pageProps.state.category as categoryReducerInterface;
    }

    return {
        current: {
            description: '',
            image: null,
            name: ''
        }
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
