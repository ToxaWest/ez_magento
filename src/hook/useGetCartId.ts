import { useMutation } from '@apollo/client';
import cartQuery from '@query/cart.query';
import BrowserDatabase from '@util/BrowserDatabase';
import { CART_ID, localCartId } from '@util/Cart';

const useGetCartId = (): () => Promise<string> => {
    const [mutateFunction] = useMutation<{ createEmptyCart: string }>(cartQuery.createEmptyCart);

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
