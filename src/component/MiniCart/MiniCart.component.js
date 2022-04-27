import styles from './MiniCart.module.scss';

import CartItem from '@component/CartItem';
import ClickOutside from '@component/ClickOutside';
import Link from '@component/Link';
import Popup from '@component/Popup';
import { popupId } from '@component/Popup/Popup.config';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function MiniCartComponent() {
    const t = useTranslations('Header');
    const { cart } = useSelector((state) => state.cart);
    const [isActive, setActive] = useState(false);
    const { total_quantity, items } = cart;

    const renderContent = () => (
        <div className={ styles.wrapper }>
            <button onClick={ () => setActive(true) }>
                <span>{ t('items in cart', { total_quantity }) }</span>
            </button>
            <Popup
              id={ popupId.MINI_CART }
              outsideClick={ false }
              isActive={ isActive }
              onClose={ () => setActive(false) }
              isStatic
              classNames={ {
                  content: styles.popupContent,
                  wrapper: styles.popupWrapper
              } }
            >
                { items.map((item) => <CartItem key={ item.id } { ...item } />) }
                <Link href="/cart">Go to cart</Link>
            </Popup>
        </div>
    );

    return (
        <ClickOutside onClick={ () => {
            setActive(false);
        } }
        >
            { renderContent() }
        </ClickOutside>
    );
}

export default MiniCartComponent;
