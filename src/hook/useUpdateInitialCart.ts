import { ApolloError, useLazyQuery } from '@apollo/client';
import useGetCartId from '@hook/useGetCartId';
import cartQuery from '@query/cart.query';
import { updateCart } from '@store/cart.store';
import { setErrorNotification } from '@store/notifiactions';
import { cartErrorResolver } from '@util/Cart';
import { getErrorMessage } from '@util/Request';
import { useDispatch } from 'react-redux';

const useUpdateInitialCart = (): () => Promise<boolean> => {
    const dispatch = useDispatch();
    const cartId = useGetCartId();
    const [loadGreeting] = useLazyQuery(cartQuery.cart, { ssr: false });

    const update = async (): Promise<boolean> => {
        const id = await cartId();
        try {
            const { data: { cart } } = await loadGreeting({ variables: { id } });
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

export default useUpdateInitialCart;
