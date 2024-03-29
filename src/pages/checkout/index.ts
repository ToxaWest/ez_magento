import { CHECKOUT_ROUTE_PATHNAME, SHIPPING, urlWithCheckout } from '@route/CheckoutPage/CheckoutPage.config';
import { ctxInterface } from '@util/SP/sp.helpers';
import { NextRouter, withRouter } from 'next/router';
import { useEffect } from 'react';

function Render({ router }: { router: NextRouter }): null {
    useEffect(() => {
        router.push({
            pathname: CHECKOUT_ROUTE_PATHNAME,
            query: {
                tab: SHIPPING
            }
        }).then(() => {}).catch(() => {});
    }, []);

    return null;
}

Render.getInitialProps = (ctx: ctxInterface) => {
    const {
        defaultLocale, locale, res
    } = ctx;

    const withLocale = (l: string): string => (locale === defaultLocale ? l : `/${locale}${l}`);

    if (typeof window === 'undefined') {
        res.writeHead(301, { location: withLocale(urlWithCheckout(SHIPPING)) });
        res.end();
    }

    return {
        messages: {}
    };
};

export default withRouter(Render);
