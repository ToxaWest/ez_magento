import { ApolloQueryResult } from '@apollo/client';
import configQuery from '@query/config.query';
import pageQuery from '@query/page.query';
import { hideBreadcrumbs } from '@store/breadcrumbs.store';
import { updatePage } from '@store/cms';
import {
    menuChildInterface,
    updateCategoryMenu, updateConfig, updateMenu, updateStoreList
} from '@store/config';
import store, { StateType } from '@store/index';
import menuUtil, { unsortedItemsInterface } from '@util/Menu/Menu';
import { getErrorMessage } from '@util/Request';
import client from '@util/Request/apolloClient';
import { set } from 'cookie-cutter';
import { NextRouter } from 'next/router';
import { AbstractIntlMessages } from 'use-intl';

import { getContextBasedOnStore, getLangPrefix } from './sp.helpers';

export interface SPAbstractInterface {
    store_code?: string,
    current_currency?: string,
    asPath?: NextRouter['asPath'],
    query?: NextRouter['query'],
    isServer?: boolean,
    locale?: NextRouter['locale']
}

export default class SPAbstract {
    container = '';

    store_code: string;

    asPath = '';

    store: StateType;

    locale: string;

    query: object = {};

    current_currency: string;

    pathname = '';

    context: object;

    isServer = false;

    constructor(props: SPAbstractInterface) {
        const {
            store_code,
            current_currency,
            asPath,
            query,
            isServer,
            locale
        } = props;

        this.store = store;
        this.locale = locale;
        this.isServer = isServer;
        this.asPath = asPath;
        this.pathname = asPath.split('?')[0].replace(`/${locale}/`, '/');
        this.query = query;
        this.store_code = store_code;
        this.current_currency = current_currency;
        this.context = getContextBasedOnStore(store_code, current_currency);
    }

    async request(query, variables = {}) {
        try {
            return await client.query({
                context: this.context,
                query,
                variables
            });
        } catch (e) {
            // eslint-disable-next-line no-console,@typescript-eslint/no-unsafe-argument
            console.log(getErrorMessage(e));
            return { data: {} } as ApolloQueryResult<object>;
        }
    }

    async initial() {
        this.store.dispatch(hideBreadcrumbs());
        await this.getStoreBasedOnLocale(false);

        const {
            data: {
                storeConfig,
                categoryMenu
            }
        }: ApolloQueryResult<{
            storeConfig: { store_code: string },
            categoryMenu: menuChildInterface[]
        }> = await this.request(configQuery.config);

        this.store.dispatch(updateConfig({
            ...storeConfig,
            lang_prefix: getLangPrefix(storeConfig.store_code)
        }));

        this.store.dispatch(updateCategoryMenu(categoryMenu));
    }

    updateClientBasedOnStore({
        store_code,
        default_display_currency_code
    }: {
        store_code: string,
        default_display_currency_code: string
    }) {
        this.store_code = store_code;
        this.current_currency = default_display_currency_code;
        this.context = getContextBasedOnStore(store_code, default_display_currency_code);
        if (!this.isServer) {
            set('current_currency', default_display_currency_code, { path: '/' });
            set('store_code', store_code, { path: '/' });
        }
    }

    async getStoreBasedOnLocale(isAfterError) {
        try {
            const { data: { availableStores: initialStoreList } }: ApolloQueryResult<{
                availableStores: {
                    store_code: string,
                    default_display_currency_code: string,
                    is_default_store: boolean
                }[]
            }> = await this.request(configQuery.availableStores);

            const storeList = initialStoreList.map((data) => ({
                ...data,
                lang_prefix: getLangPrefix(data.store_code)
            }));

            const currentStore = storeList.find(
                ({ lang_prefix }) => lang_prefix === this.locale
            );

            if (currentStore) {
                const {
                    default_display_currency_code,
                    store_code
                } = currentStore;

                if (this.store_code !== store_code) {
                    this.updateClientBasedOnStore({
                        default_display_currency_code,
                        store_code
                    });
                }
            } else {
                this.updateClientBasedOnStore(storeList.find(
                    ({ is_default_store }) => is_default_store
                ));
            }

            this.store.dispatch(updateStoreList(storeList));
        } catch (e) {
            this.updateClientBasedOnStore({
                default_display_currency_code: '',
                store_code: ''
            });
            if (!isAfterError) {
                await this.getStoreBasedOnLocale(true);
            }
        }
    }

    async getCmsPage(variables: object) {
        const { data: { cmsPage } } = await this.request(pageQuery.cmsPage, variables);
        this.container = 'CmsPage';
        this.store.dispatch(updatePage(cmsPage));
    }

    async getMenu(identifier) {
        const { data: { scandiwebMenu } }:ApolloQueryResult<{
            scandiwebMenu: {
                items: unsortedItemsInterface[]
            }
        }> = await this.request(configQuery.menu, { identifier });

        this.store.dispatch(updateMenu({
            [identifier]: Object.values(menuUtil.reduce(scandiwebMenu))
        }));
    }

    async getData() {
        await this.initial();
        const { default: messages } = (await import(`../../../i18n/${this.locale}.json`)) as AbstractIntlMessages;
        return {
            cache: client.extract(),
            container: this.container,
            messages,
            state: this.store.getState()
        };
    }
}
