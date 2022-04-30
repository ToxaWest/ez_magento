import { ApolloError, useMutation } from '@apollo/client';
import useGetCartId from '@hook/useGetCartId';
import CheckoutQuery from '@query/checkout.query';
import { updateCart } from '@store/cart.store';
import { setErrorNotification } from '@store/notifiactions';
import { getErrorMessage } from '@util/Request';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useSetShippingMethodsOnCart = (): [
    ({ method_code, carrier_code }: { method_code: string, carrier_code: string }) => void,
    boolean
] => {
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
                dispatch(setErrorNotification(getErrorMessage(e as ApolloError)));
            }
            setLoading(false);
        }, loading];
};

export default useSetShippingMethodsOnCart;
