import { ApolloProvider } from '@apollo/client';
import store from '@store/index';
import client from '@util/Request/apolloClient';
import type { AppProps } from 'next/app';
import { NextIntlProvider } from 'next-intl';
import { Provider } from 'react-redux';
import { AbstractIntlMessages } from 'use-intl';

import '@style/globals.scss';

export type MyAppType = AppProps & {
    pageProps: {
        messages: AbstractIntlMessages,
    }
};

function MyApp({
    Component,
    pageProps
}: MyAppType) {
    const {
        messages,
        ...otherProps
    } = pageProps;

    const withApollo = (children) => (
        <ApolloProvider client={ client }>
            { children }
        </ApolloProvider>
    );

    const withRedux = (children) => (
        <Provider store={ store }>
            { children }
        </Provider>
    );

    const withIntl = (children) => (
        <NextIntlProvider messages={ messages }>
            { children }
        </NextIntlProvider>
    );

    return (
        withIntl(withRedux(withApollo(
            <Component { ...otherProps } />
        )))
    );
}

export default MyApp;
