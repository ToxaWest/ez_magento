import { ApolloError, useMutation } from '@apollo/client';
import useGetCartId from '@hook/useGetCartId';
import CheckoutQuery from '@query/checkout.query';
import { updateCart } from '@store/cart.store';
import { setErrorNotification } from '@store/notifiactions';
import { getErrorMessage } from '@util/Request';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useSetPaymentMethodOnCart = (): [(payment_method: { code: string }) => void, boolean] => {
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
                dispatch(setErrorNotification(getErrorMessage(e as ApolloError)));
            }
            setLoading(false);
        }, loading];
};

export default useSetPaymentMethodOnCart;
