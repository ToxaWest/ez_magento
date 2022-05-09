import { ApolloError, useMutation } from '@apollo/client';
import useGetCartId from '@hook/useGetCartId';
import cartQuery from '@query/cart.query';
import { updateCart } from '@store/cart.store';
import { setErrorNotification } from '@store/notifiactions';
import { cartErrorResolver } from '@util/Cart';
import { getErrorMessage } from '@util/Request';
import { useDispatch } from 'react-redux';

const useAddProductsToCart = () => {
    const dispatch = useDispatch();
    const cart_Id = useGetCartId();
    const [mutateFunction] = useMutation(cartQuery.addProductsToCart);
    const update = async (cartItems) => {
        const cartId = await cart_Id();
        try {
            const { data: { addProductsToCart: { cart } } } = await mutateFunction({
                variables: { cartId, cartItems }
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

export default useAddProductsToCart;
