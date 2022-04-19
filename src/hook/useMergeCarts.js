import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { CART_ID, localCartId } from 'Dispatcher/cart.dispatcher';
import useUpdateInitialCart from 'Hook/useUpdateInitialCart';
import cartQuery from 'Query/cart.query';
import { updateCart } from 'Store/cart.store';
import BrowserDatabase from 'Util/BrowserDatabase';

const useMergeCarts = () => {
    const [mutateFunction] = useMutation(cartQuery.createEmptyCart);
    const [merge] = useMutation(cartQuery.mergeCarts);
    const updateCartData = useUpdateInitialCart();
    const dispatch = useDispatch();
    return async () => {
        const source = localCartId();
        const { data: { createEmptyCart } } = await mutateFunction();

        if (!source) {
            throw new Error('Cart is missing');
        }

        if (source !== createEmptyCart) {
            try {
                const { data: { mergeCarts } } = await merge({
                    variables: { destination: createEmptyCart, source }
                });

                BrowserDatabase.setItem(createEmptyCart, CART_ID, null);
                dispatch(updateCart(mergeCarts));
                return true;
            } catch (e) {
                return false;
            }
        }

        await updateCartData();
        return true;
    };
};

export default useMergeCarts;
