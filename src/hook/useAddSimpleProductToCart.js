import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { cartErrorResolver } from 'Dispatcher/cart.dispatcher';
import useGetCartId from 'Hook/useGetCartId';
import cartQuery from 'Query/cart.query';
import { updateCart } from 'Store/cart.store';
import { setErrorNotification } from 'Store/notifiactions';
import { getErrorMessage } from 'Util/Request';

const useAddSimpleProductToCart = () => {
    const dispatch = useDispatch();
    const cartId = useGetCartId();
    const [mutateFunction] = useMutation(cartQuery.addSimpleProductsToCart);
    const update = async (cart_items) => {
        const cart_id = await cartId();
        try {
            const { data: { addSimpleProductsToCart: { cart } } } = await mutateFunction({
                variables: { input: { cart_id, cart_items } }
            });

            dispatch(updateCart(cart));
            return true;
        } catch (e) {
            dispatch(setErrorNotification(getErrorMessage(e)));
            await cartErrorResolver(e, update);
            return false;
        }
    };

    return update;
};

export default useAddSimpleProductToCart;
