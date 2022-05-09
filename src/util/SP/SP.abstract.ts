import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { CATALOG_LINK_LIST, CATALOG_PRODUCT_LIST, SLIDER } from '@component/WidgetFactory/WidgetFactory.config';
import categoryQuery from '@query/category.query';
import configQuery from '@query/config.query';
import pageQuery from '@query/page.query';
import productQuery from '@query/product.query';
import { hideBreadcrumbs } from '@store/breadcrumbs.store';
import {
    CmsPageInterface, SliderInterface, updatePage, updateWidget
} from '@store/cms';
import {
    menuChildInterface, StoreConfigInterface,
    updateConfig, updateMenu, updateStoreList
} from '@store/config';
import store, { StateType } from '@store/index';
import {
    addBlogToMenu, normalizeCategoryMenu, normalizeMenu, unsortedItemsInterface
} from '@util/Menu';
import { getErrorMessage } from '@util/Request';
import client from '@util/Request/apolloClient';
import { set } from 'cookie-cutter';
import { Element } from 'domhandler';
import parser, { DOMNode } from 'html-react-parser';
import { NextRouter } from 'next/router';
import { AbstractIntlMessages } from 'use-intl';

import { getContextBasedOnStore, getLangPrefix } from './sp.helpers';

export interface SPAbstractInterface {
    asPath?: NextRouter['asPath'],
    current_currency?: string,
    isServer?: boolean,
    locale?: NextRouter['locale'],
    query?: NextRouter['query'],
    store_code?: string
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
            asPath,
            current_currency,
            isServer,
            locale,
            query,
            store_code
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
            return await client.query({ context: this.context, query, variables });
        } catch (e) {
            getErrorMessage(e as ApolloError);
            return { data: {} } as ApolloQueryResult<object>;
        }
    }

    async initial() {
        this.store.dispatch(hideBreadcrumbs());
        await this.getStoreBasedOnLocale(false);

        const {
            data: { categoryMenu, storeConfig }
        }: ApolloQueryResult<{
            categoryMenu: menuChildInterface[]
            storeConfig: StoreConfigInterface
        }> = await this.request(configQuery.config);

        const {
            mfblog_permalink_route,
            mfblog_top_menu_include_categories,
            mfblog_top_menu_item_text,
            store_code
        } = storeConfig;

        // if (content_customization_header_menu) {
        //     await this.getMenu(content_customization_header_menu);
        // }

        this.store.dispatch(updateConfig({
            ...storeConfig,
            lang_prefix: getLangPrefix(store_code)
        }));

        const category_menu = addBlogToMenu(normalizeCategoryMenu(categoryMenu), {
            mfblog_top_menu_include_categories,
            mfblog_permalink_route,
            mfblog_top_menu_item_text
        });

        this.store.dispatch(updateMenu({ category_menu }));
    }

    updateClientBasedOnStore({ default_display_currency_code, store_code }: {
        default_display_currency_code: string,
        store_code: string
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
                    default_display_currency_code: string,
                    is_default_store: boolean,
                    store_code: string
                }[]
            }> = await this.request(configQuery.availableStores);

            const storeList = initialStoreList.map((data) => ({
                ...data,
                lang_prefix: getLangPrefix(data.store_code)
            }));

            const currentStore = storeList.find(({ lang_prefix }) => lang_prefix === this.locale);

            if (currentStore) {
                const { default_display_currency_code, store_code } = currentStore;

                if (this.store_code !== store_code) {
                    this.updateClientBasedOnStore({
                        default_display_currency_code,
                        store_code
                    });
                }
            } else {
                this.updateClientBasedOnStore(storeList.find(({ is_default_store }) => is_default_store));
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
                const id_list = id_paths.replace(/category\//g, '').split(',');
                const { data: { categoryList } }: ApolloQueryResult<{
                    categoryList: CategoryInterface[]
                }> = await this.request(categoryQuery.category, { id_list });

                this.store.dispatch(updateWidget({ [id_paths]: categoryList }));
            },
            [CATALOG_PRODUCT_LIST]: async ({ conditions_encoded, page_var_name }: WidgetProductListInterface) => {
                const { data: { products } } = await this.request(productQuery.productList, {
                    filter: { conditions: { eq: conditions_encoded } }
                });

                this.store.dispatch(updateWidget({ [page_var_name]: products }));
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
        await Promise.all(req.map((r:WidgetFactoryInterface) => widgetMap[r.type](r) as Promise<void>));
    }

    async getCmsPage(variables: object) {
        const { data: { cmsPage } }: ApolloQueryResult<{
            cmsPage: CmsPageInterface }> = await this.request(pageQuery.cmsPage, variables);
        const { content } = cmsPage;
        await this.getWidget(content);
        this.container = 'CmsPage';
        this.store.dispatch(updatePage(cmsPage));
    }

    async getMenu(identifier: string) {
        const { data: { scandiwebMenu } }:ApolloQueryResult<{
            scandiwebMenu: { items: unsortedItemsInterface[] }
        }> = await this.request(configQuery.menu, { identifier });

        this.store.dispatch(updateMenu({ [identifier]: [normalizeMenu(scandiwebMenu)] }));
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
