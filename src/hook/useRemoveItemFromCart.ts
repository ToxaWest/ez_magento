import { ApolloError, useMutation } from '@apollo/client';
import useGetCartId from '@hook/useGetCartId';
import cartQuery from '@query/cart.query';
import { updateCart } from '@store/cart.store';
import { setErrorNotification } from '@store/notifiactions';
import { cartErrorResolver } from '@util/Cart';
import { getErrorMessage } from '@util/Request';
import { useDispatch } from 'react-redux';

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
            await cartErrorResolver(e as ApolloError, update);
            dispatch(setErrorNotification(getErrorMessage(e as ApolloError)));
            return false;
        }
    };

    return update;
};

export default useRemoveItemFromCart;
