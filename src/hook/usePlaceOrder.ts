import { ApolloError, useMutation } from '@apollo/client';
import useGetCartId from '@hook/useGetCartId';
import CheckoutQuery from '@query/checkout.query';
import { ORDER_DATA, SUCCESS, urlWithCheckout } from '@route/CheckoutPage/CheckoutPage.config';
import { AppDispatch } from '@store/index';
import { setErrorNotification } from '@store/notifiactions';
import BrowserDatabase from '@util/BrowserDatabase';
import { CART_ID } from '@util/Cart';
import { getErrorMessage } from '@util/Request';
import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const usePlaceOrder = (): [() => void, boolean] => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const cartId = useGetCartId();
    const router: NextRouter = useRouter();
    const [mutateFunction] = useMutation(CheckoutQuery.placeOrder);
    return [
        async () => {
            setLoading(true);
            try {
                const cart_id = await cartId();
                const { data: { placeOrder: { order } } } = await mutateFunction({
                    variables: { input: { cart_id } }
                });

                BrowserDatabase.setItem(order, ORDER_DATA);
                BrowserDatabase.deleteItem(CART_ID);
                await cartId();
                setLoading(false);
                router.push({
                    pathname: urlWithCheckout(SUCCESS)
                }).then(() => {}).catch(() => {});
            } catch (e) {
                dispatch(setErrorNotification(getErrorMessage(e as ApolloError)));
                setLoading(false);
            }
        }, loading
    ];
};

export default usePlaceOrder;
