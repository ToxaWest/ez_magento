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

export interface SPAbstractInterface {
    asPath?: NextRouter['asPath'],
    current_currency?: string,
    isServer?: boolean,
    locale?: NextRouter['locale'],
    query?: NextRouter['query'],
    store_code?: string
}

export const getPropsBasedOnRequest = (ctx: ctxInterface): SPAbstractInterface => {
    const {
        asPath,
        locale,
        query,
        req
    } = ctx;
    const isServer = !!req;

    const cookie = isServer ? req.headers.cookie : document.cookie;

    const {
        current_currency,
        store_code
    } = parse<string>(cookie || '');

    return {
        asPath,
        current_currency,
        isServer,
        locale,
        query,
        store_code
    };
};
export const getLangPrefix = (store_code: string): string => store_code;
// export const getLangPrefix = (store_code: string):string => store_code.split('_')[1];

export const getContextBasedOnStore = (store_code?: string, current_currency?: string) : { headers: object } => {
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
    customFilters?: string,
    page?: string,
    sort?: string,
    sort_direction?: string
}

export const getProductVariablesBasedOnQuery = (query: QueryInterface, category_uid: number | string) : object => {
    const {
        customFilters,
        page,
        sort,
        sort_direction = 'ASC'
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
