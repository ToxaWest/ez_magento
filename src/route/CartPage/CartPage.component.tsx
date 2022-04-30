import styles from './CartPage.module.scss';

import CartItem from '@component/CartItem';
import Link from '@component/Link';
import { CHECKOUT_URL } from '@route/CheckoutPage/CheckoutPage.config';
import { RootState } from '@store/index';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

function CartPageComponent(): ReactElement {
    const { cart: { items }, loading } = useSelector((state: RootState) => state.cart);

    if (!loading && items.length === 0) {
        return <span>Cart is empty</span>;
    }

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.list }>
                { items.map((item) => <CartItem key={ item.id } { ...item } />) }
            </div>
            <Link href={ CHECKOUT_URL }>Process to checkout</Link>
        </div>

    );
}

export default CartPageComponent;
