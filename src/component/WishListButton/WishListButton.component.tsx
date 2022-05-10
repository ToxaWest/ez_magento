import Button from '@ui/Button';
import { createElement, ReactElement } from 'react';

function WishListButtonComponent(props: { addToWishList: () => void, disabled: boolean }): ReactElement {
    const { addToWishList, disabled } = props;

    return createElement(
        Button,
        {
            onClick: addToWishList,
            disabled
        },
        'Wishlist'
    );
}

export default WishListButtonComponent;
