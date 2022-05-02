import {
    ApolloClient, ApolloLink, from, HttpLink, InMemoryCache, InMemoryCacheConfig
} from '@apollo/client';
import { FieldMergeFunction } from '@apollo/client/cache/inmemory/policies';
import { getContextBasedOnStore } from '@util/SP/sp.helpers';
import { parse } from 'cookie';

const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL }/graphql`
});

const cacheConfig: InMemoryCacheConfig = {
    typePolicies: {
        Customer: {
            merge(
                existing,
                incoming,
                { mergeObjects },
            ) {
                return mergeObjects(existing, incoming) as FieldMergeFunction;
            }
        },
        Products: {
            merge(
                existing,
                incoming,
                { mergeObjects },
            ) {
                return mergeObjects(existing, incoming) as FieldMergeFunction;
            }
        }
    }
};

const headersMiddleware = new ApolloLink((operation, forward) => {
    const isServer = typeof window === 'undefined';

    const { store_code, current_currency }: { store_code?: string, current_currency?: string } = parse(
        isServer ? '' : document.cookie
    );
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
        typeof window !== 'undefined' ? window.__NEXT_DATA__.props.pageProps.cache : {},
    ),
    link: from([
        headersMiddleware,
        httpLink
    ]),
    ssrMode: typeof window === 'undefined'
});

export default client;
