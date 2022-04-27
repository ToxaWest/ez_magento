import cookieCutter from 'cookie-cutter';

import configQuery from 'Query/config.query';
import pageQuery from 'Query/page.query';
import { hideBreadcrumbs } from 'Store/breadcrumbs.store';
import { updatePage } from 'Store/cms';
import {
    updateCategoryMenu, updateConfig, updateMenu, updateStoreList
} from 'Store/config';
import store from 'Store/index';
import menuUtil from 'Util/Menu/Menu';
import { getErrorMessage } from 'Util/Request';
import client from 'Util/Request/apolloClient';
import { getContextBasedOnStore, getLangPrefix } from 'Util/SP/sp.helpers';

export default class SPAbstract {
    container = '';

    asPath = '';

    query = {};

    pathname='';

    isServer = false;

    constructor(props = {}) {
        const {
            store_code, current_currency, asPath, query, isServer, locale
        } = props;

        this.store = store;
        this.locale = locale;
        this.isServer = isServer;
        this.asPath = asPath;
        this.pathname = asPath.split('?')[0].replace(`/${ locale }/`, '/');
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
            // eslint-disable-next-line no-console
            console.log(getErrorMessage(e));
            return { data: { } };
        }
    }

    async initial() {
        this.store.dispatch(hideBreadcrumbs());
        await this.getStoreBasedOnLocale();

        const { data: { storeConfig, categoryMenu } } = await this.request(configQuery.config);

        this.store.dispatch(updateConfig({
            ...storeConfig,
            lang_prefix: getLangPrefix(storeConfig.store_code)
        }));

        this.store.dispatch(updateCategoryMenu(categoryMenu));
    }

    updateClientBasedOnStore({ store_code, default_display_currency_code }) {
        this.store_code = store_code;
        this.current_currency = default_display_currency_code;
        this.context = getContextBasedOnStore(store_code, default_display_currency_code);
        if (!this.isServer) {
            cookieCutter.set('current_currency', default_display_currency_code, { path: '/' });
            cookieCutter.set('store_code', store_code, { path: '/' });
        }
    }

    async getStoreBasedOnLocale(isAfterError) {
        try {
            const { data: { availableStores: initialStoreList } } = await this.request(configQuery.availableStores);

            const storeList = initialStoreList.map((data) => ({
                ...data,
                lang_prefix: getLangPrefix(data.store_code)
            }));

            const currentStore = storeList.find(
                ({ lang_prefix }) => lang_prefix === this.locale
            );

            if (currentStore) {
                const { default_display_currency_code, store_code } = currentStore;
                if (this.store_code !== store_code) {
                    this.updateClientBasedOnStore({
                        default_display_currency_code, store_code
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
                default_display_currency_code: '', store_code: ''
            });
            if (!isAfterError) {
                await this.getStoreBasedOnLocale(true);
            }
        }
    }

    async getCmsPage(variables) {
        const { data: { cmsPage } } = await this.request(pageQuery.cmsPage, variables);
        this.container = 'CmsPage';
        this.store.dispatch(updatePage(cmsPage));
    }

    async getMenu(identifier) {
        const { data: { scandiwebMenu } } = await this.request(configQuery.menu, { identifier });

        this.store.dispatch(updateMenu({
            [identifier]: Object.values(menuUtil.reduce(scandiwebMenu))
        }));
    }

    async getData() {
        await this.initial();
        const messages = (await import(`../../../i18n/${this.locale}.json`)).default;
        return {
            cache: client.extract(),
            container: this.container,
            messages,
            state: this.store.getState()
        };
    }
}
