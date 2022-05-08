import styles from './CheckoutShippingMethods.module.scss';

import useSetShippingMethodsOnCart from '@hook/useSetShippingMethodsOnCart';
import { ACCOUNT_ROUTE_PATHNAME } from '@route/AccountPage/AccountPage.config';
import { BILLING } from '@route/CheckoutPage/CheckoutPage.config';
import { SelectedShippingMethodInterface } from '@store/cart.store';
import { RootState } from '@store/index';
import Button from '@ui/Button';
import Loader from '@ui/Loader';
import { getFinalPrice } from '@util/Price/price';
import classNames from 'classnames';
import { NextRouter, useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function CheckoutShippingMethodsComponent() {
    const { shipping_addresses } = useSelector((state: RootState) => state.cart.cart);

    const router: NextRouter = useRouter();

    const [onSelectShipping, loading] = useSetShippingMethodsOnCart();

    const [
        { selected_shipping_method, available_shipping_methods = [] }
    ] = shipping_addresses.length ? shipping_addresses : [{ selected_shipping_method: null }];

    const isSelected = ({ carrier_code, method_code }: SelectedShippingMethodInterface): boolean => {
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
            }).then(() => {}).catch(() => {});
        }
    };

    const renderShippingMethods = () => available_shipping_methods.map(({
        method_code, method_title, carrier_title, amount, carrier_code
    }) => (
        <li
          key={ method_code }
          className={ cx(
              styles.item,
              { [styles.item_active]: isSelected({ carrier_code, method_code }) },
          ) }
        >
            <button onClick={ () => onSelectShipping({ carrier_code, method_code }) }>
                { `${carrier_title } ${ method_title} ${
                    getFinalPrice({ ...amount })
                }` }
            </button>
        </li>
    ));

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
            <Loader isLoading={ loading } />
            <ul className={ styles.wrapper }>
                { renderShippingMethods() }
            </ul>
            <Button onClick={ onClick } disabled={ !selected_shipping_method }>submit</Button>
        </>
    );
}

export default CheckoutShippingMethodsComponent;
