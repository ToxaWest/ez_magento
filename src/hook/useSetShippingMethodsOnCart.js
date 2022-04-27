import { useMutation } from '@apollo/client';
import useGetCartId from '@hook/useGetCartId';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import CheckoutQuery from 'Query/checkout.query';
import { updateCart } from 'Store/cart.store';
import { setErrorNotification } from 'Store/notifiactions';
import { getErrorMessage } from 'Util/Request';

const useSetShippingMethodsOnCart = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const cartId = useGetCartId();
    const [mutateFunction] = useMutation(CheckoutQuery.setShippingMethodsOnCart);

    return [
        async ({ method_code, carrier_code }) => {
            setLoading(true);
            try {
                const cart_id = await cartId();
                const { data: { setShippingMethodsOnCart: { cart } } } = await mutateFunction({
                    variables: { input: { cart_id, shipping_methods: [{ carrier_code, method_code }] } }
                });

                dispatch(updateCart(cart));
            } catch (e) {
                dispatch(setErrorNotification(getErrorMessage(e)));
            }
            setLoading(false);
        }, loading];
};

export default useSetShippingMethodsOnCart;
