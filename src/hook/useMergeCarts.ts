import { useMutation } from '@apollo/client';
import useUpdateInitialCart from '@hook/useUpdateInitialCart';
import cartQuery from '@query/cart.query';
import { updateCart } from '@store/cart.store';
import BrowserDatabase from '@util/BrowserDatabase';
import { CART_ID, localCartId } from '@util/Cart';
import { useDispatch } from 'react-redux';

const useMergeCarts = (): () => Promise<boolean> => {
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
