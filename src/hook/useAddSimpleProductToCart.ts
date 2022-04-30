import { ApolloError, useMutation } from '@apollo/client';
import useGetCartId from '@hook/useGetCartId';
import cartQuery from '@query/cart.query';
import { updateCart } from '@store/cart.store';
import { setErrorNotification } from '@store/notifiactions';
import { cartErrorResolver } from '@util/Cart';
import { getErrorMessage } from '@util/Request';
import { useDispatch } from 'react-redux';

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
            dispatch(setErrorNotification(getErrorMessage(e as ApolloError)));
            await cartErrorResolver(e as ApolloError, update);
            return false;
        }
    };

    return update;
};

export default useAddSimpleProductToCart;
