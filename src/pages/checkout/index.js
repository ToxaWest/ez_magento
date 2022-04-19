import { withRouter } from 'next/router';
import { useEffect } from 'react';

import { CHECKOUT_ROUTE_PATHNAME, SHIPPING, urlWithCheckout } from 'Route/CheckoutPage/CheckoutPage.config';

const render = withRouter(({ router }) => {
    useEffect(() => {
        router.push({
            pathname: CHECKOUT_ROUTE_PATHNAME,
            query: {
                tab: SHIPPING
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
        res.writeHead(301, { location: withLocale(urlWithCheckout(SHIPPING)) });
        res.end();
    }

    return {
        messages: {}
    };
};

export default render;
