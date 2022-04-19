import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { CART_ID } from 'Dispatcher/cart.dispatcher';
import useGetCartId from 'Hook/useGetCartId';
import CheckoutQuery from 'Query/checkout.query';
import { ORDER_DATA, SUCCESS, urlWithCheckout } from 'Route/CheckoutPage/CheckoutPage.config';
import { setErrorNotification } from 'Store/notifiactions';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getErrorMessage } from 'Util/Request';

const usePlaceOrder = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const cartId = useGetCartId();
    const router = useRouter();
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
                });
            } catch (e) {
                dispatch(setErrorNotification(getErrorMessage(e)));
                setLoading(false);
            }
        }, loading
    ];
};

export default usePlaceOrder;
