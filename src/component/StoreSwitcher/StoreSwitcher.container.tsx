import styles from './StoreSwitcher.module.scss';

import { availableStoreInterface } from '@store/config';
import { RootState } from '@store/index';
import Select from '@ui/Select';
import client from '@util/Request/apolloClient';
import { NextRouter, useRouter } from 'next/router';
import { createElement, ReactElement } from 'react';
import { useSelector } from 'react-redux';

function StoreSwitcherContainer(): ReactElement {
    const { availableStores, config: { lang_prefix } } = useSelector((state: RootState) => state.config);

    const router: NextRouter = useRouter();

    const handleChange = (locale:string): void => {
        if (!locale) {
            return;
        }

        if (locale === lang_prefix) {
            return;
        }

        client.clearStore().then(() => {
            router.push(router.asPath, null, { locale }).then(() => {}).catch(() => {});
        }).catch(() => {});
    };

    const _normalizeStoreList = (list:availableStoreInterface[]): {
        currency_code: string, label: string, value: string
    }[] => list.map(({ default_display_currency_code, lang_prefix: value, store_name }) => ({
        currency_code: default_display_currency_code, label: store_name, value
    }));

    return createElement(Select, {
        className: styles.wrapper,
        onChange: handleChange,
        options: _normalizeStoreList(availableStores),
        defaultValue: lang_prefix
    });
}

export default StoreSwitcherContainer;
