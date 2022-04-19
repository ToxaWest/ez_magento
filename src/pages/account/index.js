import { withRouter } from 'next/router';
import { useEffect } from 'react';

import { ACCOUNT_ROUTE_PATHNAME, DEFAULT_ACCOUNT_TAB, urlWithAccount } from 'Route/AccountPage/AccountPage.config';

const render = withRouter(({ router }) => {
    useEffect(() => {
        router.push({
            pathname: ACCOUNT_ROUTE_PATHNAME,
            query: {
                tab: DEFAULT_ACCOUNT_TAB
            }
        });
    }, []);

    return null;
});

render.getInitialProps = async (ctx) => {
    const {
        res, locale, defaultLocale
    } = ctx;

    const withLocale = (l) => (locale === defaultLocale ? l : `/${locale}${l}`);

    if (typeof window === 'undefined') {
        res.writeHead(301, { location: withLocale(urlWithAccount(DEFAULT_ACCOUNT_TAB)) });
        res.end();
    }

    return {
        messages: {}
    };
};

export default render;
