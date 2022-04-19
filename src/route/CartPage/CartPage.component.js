import styles from './CartPage.module.scss';

import { useSelector } from 'react-redux';

import CartItem from 'Component/CartItem';
import Link from 'Component/Link';
import { CHECKOUT_URL } from 'Route/CheckoutPage/CheckoutPage.config';

const CartPageComponent = () => {
    const { cart: { items }, loading } = useSelector((state) => state.cart);

    if (!loading && items.length === 0) {
        return 'Cart is empty';
    }

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.list }>
                { items.map((item) => <CartItem key={ item.id } { ...item } />) }
            </div>
            <Link href={ CHECKOUT_URL }>Process to checkout</Link>
        </div>

    );
};

export default CartPageComponent;
