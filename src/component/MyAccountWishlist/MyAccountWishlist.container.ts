import useWishList from '@hook/useWishList';
import { createElement, ReactElement } from 'react';

import MyAccountWishlistComponent from './MyAccountWishlist.component';

function MyAccountWishlistContainer(): ReactElement {
    const {
        items, loading, pageInfo, removeFromWishList
    } = useWishList({ getWishList: true });

    return createElement(MyAccountWishlistComponent, {
        removeFromWishList,
        pageInfo,
        loading,
        items
    });
}

export default MyAccountWishlistContainer;
