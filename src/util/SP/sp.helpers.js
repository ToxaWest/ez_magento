import cookieP from 'cookie';

import { TOKEN_ID } from 'Dispatcher/myAccount.dispatcher';
import BrowserDatabase from 'Util/BrowserDatabase';
import { configureAttributesForRequest } from 'Util/Link';

export const getPropsBasedOnRequest = (ctx) => {
    const {
        locale, req, asPath, query, res
    } = ctx;
    const isServer = !!req;

    const cookie = isServer ? req.headers.cookie : document.cookie;

    const { store_code, current_currency } = cookieP.parse(cookie || '');
    return {
        asPath, current_currency, isServer, locale, query, res, store_code
    };
};
export const getLangPrefix = (store_code) => store_code;
// export const getLangPrefix = (store_code) => store_code.split('_')[1];

export const getContextBasedOnStore = (store_code, current_currency) => {
    const isServer = typeof window === 'undefined';
    const token = isServer ? '' : (BrowserDatabase.getItem(TOKEN_ID) || '');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            ...(current_currency ? { 'Content-Currency': current_currency } : {}),
            ...(store_code ? { Store: store_code } : {})
        }
    };
};

export const getProductVariablesBasedOnQuery = (query, category_uid) => {
    const {
        sort, sort_direction = 'ASC', customFilters, page
    } = query;

    return {
        currentPage: page || 1,
        filter: {
            category_uid: { eq: category_uid },
            ...(customFilters
                ? configureAttributesForRequest(customFilters)
                : {}
            )
        },
        ...(sort
            ? { sort: { [sort]: sort_direction } }
            : {}
        )
    };
};
