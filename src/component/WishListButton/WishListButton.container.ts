import useWishList from '@hook/useWishList';
import { RootState } from '@store/index';
import { createElement, ReactElement } from 'react';
import { useSelector } from 'react-redux';

import WishListButtonComponent from './WishListButton.component';

function WishListButtonContainer({ sku }: { sku: string }): ReactElement {
    const {
        addToWishList,
        disabled
    } = useWishList();
    const { isSignedIn } = useSelector((state: RootState) => state.account);
    const { magento_wishlist_general_is_enabled } = useSelector((state: RootState) => state.config.config);
    if (!(magento_wishlist_general_is_enabled === '1') || !isSignedIn) {
        return createElement('span');
    }

    return createElement(WishListButtonComponent, {
        disabled,
        addToWishList: () => addToWishList({ sku })
    });
}

export default WishListButtonContainer;
