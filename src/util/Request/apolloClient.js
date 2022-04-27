import {
    ApolloClient, ApolloLink, from, HttpLink, InMemoryCache
} from '@apollo/client';
import cookieP from 'cookie';

import { getContextBasedOnStore } from 'Util/SP/sp.helpers';

const httpLink = new HttpLink({ uri: `${process.env.NEXT_PUBLIC_API_URL }/graphql` });

const cacheConfig = {
    typePolicies: {
        Customer: {
            merge(
                existing,
                incoming,
                { mergeObjects }
            ) {
                return mergeObjects(existing, incoming);
            }
        },
        Products: {
            merge(
                existing,
                incoming,
                { mergeObjects }
            ) {
                return mergeObjects(existing, incoming);
            }
        }
    }
};

const headersMiddleware = new ApolloLink((operation, forward) => {
    const isServer = typeof window === 'undefined';

    const { store_code, current_currency } = cookieP.parse(isServer ? '' : document.cookie);
    const { headers: additional } = getContextBasedOnStore(store_code, current_currency);
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            ...additional
        }
    }));

    return forward(operation);
});

const client = new ApolloClient({
    cache: new InMemoryCache(cacheConfig).restore(
        typeof window !== 'undefined' ? window.__NEXT_DATA__.props.pageProps.cache : {}
    ),
    link: from([
        headersMiddleware,
        httpLink
    ]),
    ssrMode: !process.browser
});

export default client;
