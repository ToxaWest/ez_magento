import useWishList from '@hook/useWishList';
import { createElement } from 'react';

import MyAccountWishlistComponent from './MyAccountWishlist.component';

function MyAccountWishlistContainer() {
    const {
        pageInfo, items, removeFromWishList, loading
    } = useWishList({ getWishList: true });

    return createElement(MyAccountWishlistComponent, {
        removeFromWishList,
        pageInfo,
        loading,
        items
    });
}

export default MyAccountWishlistContainer;
