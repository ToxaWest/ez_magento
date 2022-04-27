import styles from './CheckoutShippingMethods.module.scss';

import Loader from '@component/Loader';
import useSetShippingMethodsOnCart from '@hook/useSetShippingMethodsOnCart';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { ACCOUNT_ROUTE_PATHNAME } from 'Route/AccountPage/AccountPage.config';
import { BILLING } from 'Route/CheckoutPage/CheckoutPage.config';
import { getFinalPrice } from 'Util/Price/price';

const cx = classNames.bind(styles);

function CheckoutShippingMethodsComponent() {
    const { shipping_addresses } = useSelector(
        (state) => state.cart.cart
    );

    const router = useRouter();

    const [onSelectShipping, loading] = useSetShippingMethodsOnCart();

    const [
        { selected_shipping_method, available_shipping_methods = [] }
    ] = shipping_addresses.length ? shipping_addresses : [{}];

    const isSelected = ({ carrier_code, method_code }) => {
        if (!selected_shipping_method) {
            return false;
        }
        const { carrier_code: carr, method_code: meth } = selected_shipping_method;
        return (carr === carrier_code && method_code === meth);
    };

    const onClick = () => {
        if (selected_shipping_method) {
            router.push({
                pathname: ACCOUNT_ROUTE_PATHNAME,
                query: {
                    tab: BILLING
                }
            });
        }
    };

    const renderShippingMethod = ({
        method_code, method_title, carrier_title, amount, carrier_code
    }) => (
        <li
          key={ method_code }
          className={ cx(
              styles.item,
              { [styles.item_active]: isSelected({ carrier_code, method_code }) }
          ) }
        >
            <button onClick={ () => onSelectShipping({ carrier_code, method_code }) }>
                { `${carrier_title } ${ method_title} ${
                    getFinalPrice({ ...amount })
                }` }
            </button>
        </li>
    );

    const renderNoDelivery = () => {
        if (available_shipping_methods.length !== 0) {
            return null;
        }

        return (
            <span>
                No delivery for selected address
            </span>
        );
    };

    return (
        <>
            { renderNoDelivery() }
            <ul className={ styles.wrapper }>
                <Loader isLoading={ loading } />
                { available_shipping_methods.map(renderShippingMethod) }
            </ul>
            <button onClick={ onClick } disabled={ !selected_shipping_method }>submit</button>
        </>
    );
}

export default CheckoutShippingMethodsComponent;
