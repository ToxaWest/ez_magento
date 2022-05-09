import { ACCOUNT_ROUTE_PATHNAME, DEFAULT_ACCOUNT_TAB, urlWithAccount } from '@route/AccountPage/AccountPage.config';
import { ctxInterface } from '@util/SP/sp.helpers';
import { NextRouter, withRouter } from 'next/router';
import { useEffect } from 'react';

function Render({ router }: { router: NextRouter }) {
    useEffect(() => {
        router.push({
            pathname: ACCOUNT_ROUTE_PATHNAME,
            query: {
                tab: DEFAULT_ACCOUNT_TAB
            }
        }).then(() => {}).catch(() => {});
    }, []);

    return null;
}

Render.getInitialProps = (ctx : ctxInterface) => {
    const {
        defaultLocale, locale, res
    } = ctx;

    const withLocale = (l:string) => (locale === defaultLocale ? l : `/${locale}${l}`);

    if (typeof window === 'undefined') {
        res.writeHead(301, { location: withLocale(urlWithAccount(DEFAULT_ACCOUNT_TAB)) });
        res.end();
    }

    return {
        messages: {}
    };
};

export default withRouter(Render);
