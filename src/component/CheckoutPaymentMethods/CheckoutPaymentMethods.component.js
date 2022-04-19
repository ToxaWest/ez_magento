import styles from './CheckoutPaymentMethods.module.scss';

import classNames from 'classnames';
import { useSelector } from 'react-redux';

import Loader from 'Component/Loader';
import usePlaceOrder from 'Hook/usePlaceOrder';
import useSetPaymentMethodOnCart from 'Hook/useSetPaymentMethodOnCart';
import { notInteractiveClick } from 'Util/Events';

const cx = classNames.bind(styles);

const CheckoutPaymentMethodsComponent = () => {
    const { selected_payment_method, available_payment_methods } = useSelector(
        (state) => state.cart.cart
    );

    const [placeOrder, orderLoading] = usePlaceOrder();

    const [setPaymentMethod, loading] = useSetPaymentMethodOnCart();

    const onClick = (code) => {
        setPaymentMethod({ code }).then((ok) => {
            if (ok) {
                // rdy for pay
            }
        });
    };

    const renderPaymentMethod = ({ code, title }) => (
        <li
          role="option"
          tabIndex={ 0 }
          key={ code }
          className={ cx(
              styles.item
          ) }
          aria-selected={ code === selected_payment_method.code }
          onClick={ () => onClick(code) }
          onKeyDown={ notInteractiveClick }
        >
            { title }
        </li>
    );

    return (
        <div>
            <Loader isLoading={ loading || orderLoading } />
            <ul className={ styles.wrapper }>
                { available_payment_methods.map(renderPaymentMethod) }
            </ul>
            <button onClick={ placeOrder } disabled={ !selected_payment_method.code }>Place order</button>
        </div>
    );
};

export default CheckoutPaymentMethodsComponent;
