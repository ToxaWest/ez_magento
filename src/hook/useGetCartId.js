import { useMutation } from '@apollo/client';

import { CART_ID, localCartId } from 'Dispatcher/cart.dispatcher';
import cartQuery from 'Query/cart.query';
import BrowserDatabase from 'Util/BrowserDatabase';

const useGetCartId = () => {
    const [mutateFunction] = useMutation(cartQuery.createEmptyCart);

    return async () => {
        const cartId = localCartId();
        if (cartId) {
            return cartId;
        }

        const { data: { createEmptyCart } } = await mutateFunction();

        BrowserDatabase.setItem(createEmptyCart, CART_ID, null);
        return createEmptyCart;
    };
};

export default useGetCartId;
