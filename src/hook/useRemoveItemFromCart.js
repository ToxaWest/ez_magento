import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { cartErrorResolver } from 'Dispatcher/cart.dispatcher';
import useGetCartId from 'Hook/useGetCartId';
import cartQuery from 'Query/cart.query';
import { updateCart } from 'Store/cart.store';
import { setErrorNotification } from 'Store/notifiactions';
import { getErrorMessage } from 'Util/Request';

const useRemoveItemFromCart = () => {
    const dispatch = useDispatch();
    const cartId = useGetCartId();
    const [mutateFunction] = useMutation(cartQuery.removeItemFromCart);
    const update = async (cart_item_id) => {
        const cart_id = await cartId();
        try {
            const { data: { removeItemFromCart: { cart } } } = await mutateFunction({
                variables: { input: { cart_id, cart_item_id } }
            });

            dispatch(updateCart(cart));
            return true;
        } catch (e) {
            await cartErrorResolver(e, update);
            dispatch(setErrorNotification(getErrorMessage(e)));
            return false;
        }
    };

    return update;
};

export default useRemoveItemFromCart;
