import { useMutation } from '@apollo/client';
import useGetCartId from '@hook/useGetCartId';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import CheckoutQuery from 'Query/checkout.query';
import { updateCart } from 'Store/cart.store';
import { setErrorNotification } from 'Store/notifiactions';
import { getErrorMessage } from 'Util/Request';

const useSetPaymentMethodOnCart = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const cartId = useGetCartId();
    const [mutateFunction] = useMutation(CheckoutQuery.setPaymentMethodOnCart);

    return [
        async (payment_method) => {
            setLoading(true);
            try {
                const cart_id = await cartId();
                const { data: { setPaymentMethodOnCart: { cart } } } = await mutateFunction({
                    variables: { input: { cart_id, payment_method } }
                });

                dispatch(updateCart(cart));
            } catch (e) {
                dispatch(setErrorNotification(getErrorMessage(e)));
            }
            setLoading(false);
        }, loading];
};

export default useSetPaymentMethodOnCart;
