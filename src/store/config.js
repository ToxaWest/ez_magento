import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
    if (typeof window !== 'undefined') {
        return window.__NEXT_DATA__.props.pageProps.state.config;
    }

    return {
        availableStores: [],
        config: {},
        menu: {}
    };
};

export const configReducer = createSlice({
    initialState: getInitialState(),
    name: 'config',
    reducers: {
        updateCategoryMenu: (state, { payload }) => {
            const _normalizeChild = (children, parent_id) => children.reduce((acc, item) => {
                const { item_id, children, include_in_menu } = item;
                if (!include_in_menu) {
                    return acc;
                }
                acc[item_id] = {
                    ...item,
                    children: _normalizeChild(children, item_id),
                    item_id: item_id.toString(),
                    parent_id
                };

                return acc;
            }, {});

            const category_menu = payload.reduce((acc, item) => {
                const { item_id, children } = item;

                return [...acc, {
                    ...item,
                    children: _normalizeChild(children, item_id),
                    item_id: item_id.toString(),
                    parent_id: 0
                }];
            }, []);

            state.menu = { ...state.menu, ...{ category_menu } };
        },
        updateConfig: (state, action) => {
            state.config = action.payload;
        },
        updateMenu: (state, { payload }) => {
            state.menu = { ...state.menu, ...payload };
        },
        updateStoreList: (state, { payload }) => {
            state.availableStores = payload;
        }
    }
});

export const {
    updateConfig, updateMenu, updateStoreList, updateCategoryMenu
} = configReducer.actions;

export default configReducer.reducer;
