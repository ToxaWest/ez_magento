import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { cartErrorResolver } from 'Dispatcher/cart.dispatcher';
import useGetCartId from 'Hook/useGetCartId';
import cartQuery from 'Query/cart.query';
import { updateCart } from 'Store/cart.store';
import { setErrorNotification } from 'Store/notifiactions';
import { getErrorMessage } from 'Util/Request';

const useUpdateInitialCart = () => {
    const dispatch = useDispatch();
    const cartId = useGetCartId();
    const [loadGreeting] = useLazyQuery(cartQuery.cart);

    const update = async () => {
        const id = await cartId();
        try {
            const { data: { cart } } = await loadGreeting({ variables: { id } });
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

export default useUpdateInitialCart;
