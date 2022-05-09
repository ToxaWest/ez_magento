import useWishList from '@hook/useWishList';
import { createElement } from 'react';

import MyAccountWishlistComponent from './MyAccountWishlist.component';

function MyAccountWishlistContainer() {
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
