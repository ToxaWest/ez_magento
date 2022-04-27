import useSetShippingAddressOnCart from '@hook/useSetShippingAddressOnCart';
import useUserAddress from '@hook/useUserAddress';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { CHECKOUT_ROUTE_PATHNAME, DELIVERY } from 'Route/CheckoutPage/CheckoutPage.config';
import { _normalizeAddressAsMagentoStyle } from 'Util/Address';

import CheckoutShippingComponent from './CheckoutShipping.component';

function CheckoutShippingContainer() {
    const [setShippingAddressOnCart, loading] = useSetShippingAddressOnCart();
    const router = useRouter();
    const fields = useUserAddress({});
    const {
        cart: { cart: { shipping_addresses } }
    } = useSelector((state) => state);

    const [{ selected_shipping_method, ...cartAddress }] = shipping_addresses.length ? shipping_addresses : [{}];

    const onSubmit = (e) => {
        setShippingAddressOnCart(e).then((ok) => {
            if (ok) {
                router.push({
                    pathname: CHECKOUT_ROUTE_PATHNAME,
                    query: {
                        tab: DELIVERY
                    }
                });
            }
        });
    };

    const containerProps = {
        defaultValues: _normalizeAddressAsMagentoStyle(cartAddress),
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
