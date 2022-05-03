import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './account.store';
import blogReducer from './blog.store';
import breadcrumbsReducer from './breadcrumbs.store';
import cartReducer from './cart.store';
import categoryReducer from './category.store';
import cmsReducer from './cms';
import configReducer from './config';
import metaReducer from './meta.store';
import notificationsReducer from './notifiactions';
import popupReducer from './popup';
import productsReducer from './products.store';

const store = configureStore({
    reducer: {
        blog: blogReducer,
        meta: metaReducer,
        account: accountReducer,
        breadcrumbs: breadcrumbsReducer,
        cart: cartReducer,
        category: categoryReducer,
        cms: cmsReducer,
        config: configReducer,
        notifications: notificationsReducer,
        popup: popupReducer,
        products: productsReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type StateType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export default store;
