import { createSlice } from '@reduxjs/toolkit';

interface categoryReducerInterface {
    current: CategoryInterface
}

const getInitialState = (): categoryReducerInterface => {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return window.__NEXT_DATA__.props.pageProps.state.category as categoryReducerInterface;
    }

    return {
        current: {
            breadcrumbs: [],
            uid: '',
            description: '',
            image: null,
            name: '',
            title: '',
            url: ''
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
