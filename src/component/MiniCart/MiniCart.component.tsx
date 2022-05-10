import styles from './MiniCart.module.scss';

import CartItem from '@component/CartItem';
import ClickOutside from '@component/ClickOutside';
import Link from '@component/Link';
import Popup from '@component/Popup';
import { popupId } from '@component/Popup/Popup.config';
import { RootState } from '@store/index';
import Icon from '@ui/Icon';
import { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';

function MiniCartComponent(): ReactElement {
    const { cart } = useSelector((state: RootState) => state.cart);
    const [isActive, setActive] = useState<boolean>(false);
    const { items, total_quantity } = cart;

    const renderContent = (): ReactElement => (
        <div className={ styles.wrapper }>
            <button onClick={ () => setActive(true) }>
                <Icon name="shopping_bag" />
                <span className={ styles.count }>{ total_quantity }</span>
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
                <div>{ items.map((item) => <CartItem key={ item.id } { ...item } />) }</div>
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
