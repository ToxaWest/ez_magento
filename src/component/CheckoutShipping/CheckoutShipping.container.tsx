import useSetShippingAddressOnCart from '@hook/useSetShippingAddressOnCart';
import useUserAddress from '@hook/useUserAddress';
import { CHECKOUT_ROUTE_PATHNAME, DELIVERY } from '@route/CheckoutPage/CheckoutPage.config';
import { RootState } from '@store/index';
import { _normalizeAddressAsMagentoStyle, fieldsInterface } from '@util/Address';
import { NextRouter, useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import CheckoutShippingComponent from './CheckoutShipping.component';

function CheckoutShippingContainer(): ReactElement {
    const [setShippingAddressOnCart, loading] = useSetShippingAddressOnCart();
    const router: NextRouter = useRouter();
    const fields = useUserAddress({});
    const {
        cart: { cart: { shipping_addresses } }
    } = useSelector((state: RootState) => state);

    const [{ selected_shipping_method, ...cartAddress }] = shipping_addresses.length
        ? shipping_addresses
        : [{ selected_shipping_method: null }];

    const onSubmit = (e: fieldsInterface): void => {
        setShippingAddressOnCart(e).then((ok) => {
            if (ok) {
                router.push({
                    pathname: CHECKOUT_ROUTE_PATHNAME,
                    query: {
                        tab: DELIVERY
                    }
                }).then(() => {}).catch(() => {});
            }
        }).catch(() => {});
    };

    const containerProps = {
        defaultValues: _normalizeAddressAsMagentoStyle(cartAddress) as initialValuesForm,
        fields,
        loading,
        onSubmit
    };

    return (
        <CheckoutShippingComponent
          { ...containerProps }
        />
    );
}

export default CheckoutShippingContainer;
