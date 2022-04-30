import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { CATALOG_LINK_LIST, SLIDER } from '@component/WidgetFactory/WidgetFactory.config';
import categoryQuery from '@query/category.query';
import configQuery from '@query/config.query';
import pageQuery from '@query/page.query';
import { hideBreadcrumbs } from '@store/breadcrumbs.store';
import {
    CmsPageInterface, SliderInterface, updatePage, updateWidget
} from '@store/cms';
import {
    menuChildInterface,
    updateCategoryMenu, updateConfig, updateMenu, updateStoreList
} from '@store/config';
import store, { StateType } from '@store/index';
import menuUtil, { unsortedItemsInterface } from '@util/Menu/Menu';
import { getErrorMessage } from '@util/Request';
import client from '@util/Request/apolloClient';
import { set } from 'cookie-cutter';
import { Element } from 'domhandler';
import parser, { DOMNode } from 'html-react-parser';
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
            getErrorMessage(e as ApolloError);
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

    async getWidget(content: string): Promise<void> {
        const req = [];
        const widgetMap = {
            [SLIDER]: async ({ slider_id }: WidgetSliderInterface) => {
                const { data: { scandiwebSlider } }: ApolloQueryResult<{
                    scandiwebSlider: SliderInterface
                }> = await this.request(pageQuery.scandiwebSlider, { id: slider_id });

                this.store.dispatch(updateWidget({ [slider_id]: scandiwebSlider }));
            },
            [CATALOG_LINK_LIST]: async ({ id_paths }: WidgetLinkInterface) => {
                const cat = id_paths.replace(/category\//g, '');
                const id_list = cat.split(',');
                const { data: { categoryList } }: ApolloQueryResult<{
                    categoryList: CategoryInterface[]
                }> = await this.request(categoryQuery.category, { id_list });

                this.store.dispatch(updateWidget({ [id_paths]: categoryList }));
            }
        };

        parser(content, {
            replace: (domNode: DOMNode) => {
                if (domNode instanceof Element) {
                    const { attribs, name } = domNode;
                    if (name === 'widget' && widgetMap[attribs.type]) {
                        req.push(attribs);
                    }
                }
            }
        });
        if (!req.length) {
            return;
        }
        await Promise.all(
            req.map(
                (r:WidgetFactoryInterface) => widgetMap[r.type](r) as Promise<void>
            )
        );
    }

    async getCmsPage(variables: object) {
        const { data: { cmsPage } }:
            ApolloQueryResult<{ cmsPage: CmsPageInterface }> = await this.request(pageQuery.cmsPage, variables);
        const { content } = cmsPage;
        await this.getWidget(content);
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
