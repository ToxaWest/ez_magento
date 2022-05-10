import { ApolloError } from '@apollo/client';
import BrowserDatabase from '@util/BrowserDatabase';

export const CART_ID = 'cartId';

export const localCartId = (): string => BrowserDatabase.getItem(CART_ID) as string;
export const cartErrorResolver = async (e: ApolloError, update): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (e.graphQLErrors[0]?.extensions?.category === 'graphql-no-such-entity') {
        BrowserDatabase.deleteItem(CART_ID);
        await update();
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (e.graphQLErrors[0]?.extensions?.category === 'graphql-authorization') {
        BrowserDatabase.deleteItem(CART_ID);
        await update();
    }
};
