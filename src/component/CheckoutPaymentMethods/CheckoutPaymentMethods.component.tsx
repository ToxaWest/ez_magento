import styles from './CheckoutPaymentMethods.module.scss';

import usePlaceOrder from '@hook/usePlaceOrder';
import useSetPaymentMethodOnCart from '@hook/useSetPaymentMethodOnCart';
import { RootState } from '@store/index';
import Button from '@ui/Button';
import Loader from '@ui/Loader';
import { notInteractiveClick } from '@util/Events';
import classNames from 'classnames';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function CheckoutPaymentMethodsComponent(): ReactElement {
    const { available_payment_methods, selected_payment_method } = useSelector(
        (state: RootState) => state.cart.cart,
    );

    const [placeOrder, orderLoading] = usePlaceOrder();

    const [setPaymentMethod, loading] = useSetPaymentMethodOnCart();

    const onClick = (code): void => {
        setPaymentMethod({ code });
    };

    const renderPaymentMethod = ({ code, title }): ReactElement => (
        <li
          role="option"
          tabIndex={ 0 }
          key={ code }
          className={ cx(
              styles.item,
          ) }
          aria-selected={ code === selected_payment_method.code }
          onClick={ () => onClick(code) }
          onKeyDown={ notInteractiveClick }
        >
            { title }
        </li>
    );

    return (
        <>
            <Loader isLoading={ loading || orderLoading } />
            <ul className={ styles.wrapper }>
                { available_payment_methods.map(renderPaymentMethod) }
            </ul>
            <Button onClick={ placeOrder } disabled={ !selected_payment_method?.code }>Place order</Button>
        </>
    );
}

export default CheckoutPaymentMethodsComponent;
