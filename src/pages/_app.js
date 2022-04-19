import 'Styles/globals.scss';

import { ApolloProvider } from '@apollo/client';
import { NextIntlProvider } from 'next-intl';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import store from 'Store/index';
import client from 'Util/Request/apolloClient';

const MyApp = ({ Component, pageProps }) => {
    const {
        messages
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
            <Component { ...pageProps } />
        )))
    );
};

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.shape({
        messages: PropTypes.shape(
            { [PropTypes.string]: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]) }
        ).isRequired
    }).isRequired
};

export default MyApp;
