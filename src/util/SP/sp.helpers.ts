import { TOKEN_ID } from '@util/Account';
import BrowserDatabase from '@util/BrowserDatabase';
import { configureAttributesForRequest } from '@util/Link';
import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRouter } from 'next/router';

export interface ctxInterface extends NextRouter {
    req: NextApiRequest,
    res: NextApiResponse
}

export const getPropsBasedOnRequest = (ctx: ctxInterface) => {
    const {
        locale,
        req,
        asPath,
        query,
        res
    } = ctx;
    const isServer = !!req;

    const cookie = isServer ? req.headers.cookie : document.cookie;

    const {
        store_code,
        current_currency
    } = parse<string>(cookie || '');

    return {
        asPath,
        current_currency,
        isServer,
        locale,
        query,
        res,
        store_code
    };
};
export const getLangPrefix = (store_code: string) => store_code;
// export const getLangPrefix = (store_code: string):string => store_code.split('_')[1];

export const getContextBasedOnStore = (store_code?: string, current_currency?: string) => {
    const isServer: boolean = typeof window === 'undefined';
    const token: string = isServer ? '' : (BrowserDatabase.getItem(TOKEN_ID) as string || '');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            ...(current_currency ? { 'Content-Currency': current_currency } : {}),
            ...(store_code ? { Store: store_code } : {})
        }
    };
};

interface QueryInterface {
    sort?: string,
    sort_direction?: string,
    customFilters?: string,
    page?: string
}

export const getProductVariablesBasedOnQuery = (query: QueryInterface, category_uid: number | string) => {
    const {
        sort,
        sort_direction = 'ASC',
        customFilters,
        page
    } = query;

    return {
        currentPage: page || 1,
        filter: {
            category_uid: { eq: category_uid },
            ...(customFilters ? configureAttributesForRequest(customFilters) : {}
            )
        },
        ...(sort ? { sort: { [sort]: sort_direction } } : {}
        )
    };
};
