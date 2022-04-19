import { configureStore } from '@reduxjs/toolkit';

import accountReducer from 'Store/account.store';
import breadcrumbsReducer from 'Store/breadcrumbs.store';
import cartReducer from 'Store/cart.store';
import categoryReducer from 'Store/category';
import cmsReducer from 'Store/cms';
import configReducer from 'Store/config';
import notificationsReducer from 'Store/notifiactions';
import popupReducer from 'Store/popup';
import productsReducer from 'Store/products';

export default configureStore({
    reducer: {
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
