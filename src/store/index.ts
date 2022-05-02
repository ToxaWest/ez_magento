import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '@store/account.store';
import breadcrumbsReducer from '@store/breadcrumbs.store';
import cartReducer from '@store/cart.store';
import categoryReducer from '@store/category.store';
import cmsReducer from '@store/cms';
import configReducer from '@store/config';
import metaReducer from '@store/meta.store';
import notificationsReducer from '@store/notifiactions';
import popupReducer from '@store/popup';
import productsReducer from '@store/products.store';

const store = configureStore({
    reducer: {
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
