import BrowserDatabase from 'Util/BrowserDatabase';

export const CART_ID = 'cartId';

export const localCartId = () => BrowserDatabase.getItem(CART_ID);
export const cartErrorResolver = async (e, update) => {
    if (e.graphQLErrors[0]?.extensions?.category === 'graphql-no-such-entity') {
        BrowserDatabase.deleteItem(CART_ID);
        await update();
    }
    if (e.graphQLErrors[0]?.extensions?.category === 'graphql-authorization') {
        BrowserDatabase.deleteItem(CART_ID);
        await update();
    }
};
