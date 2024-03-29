import { ApolloProvider } from '@apollo/client';
import store from '@store/index';
import client from '@util/Request/apolloClient';
import type { AppProps } from 'next/app';
import { NextIntlProvider } from 'next-intl';
import { ReactElement } from 'react';
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
}: MyAppType): ReactElement {
    const {
        messages,
        ...otherProps
    } = pageProps;

    const withApollo = (children): ReactElement => (
        <ApolloProvider client={ client }>
            { children }
        </ApolloProvider>
    );

    const withRedux = (children): ReactElement => (
        <Provider store={ store }>
            { children }
        </Provider>
    );

    const withIntl = (children): ReactElement => (
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
