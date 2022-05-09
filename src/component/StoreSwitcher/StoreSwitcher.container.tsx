import { availableStoreInterface } from '@store/config';
import { RootState } from '@store/index';
import client from '@util/Request/apolloClient';
import { NextRouter, useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import StoreSwitcherComponent from './StoreSwitcher.component';

function StoreSwitcherContainer() {
    const _normalizeStoreList = (list:availableStoreInterface[]) => list.map(
        ({ default_display_currency_code, lang_prefix, store_name }) => ({
            currency_code: default_display_currency_code, label: store_name, value: lang_prefix
        })
    );
    const { availableStores, config: { lang_prefix } } = useSelector((state: RootState) => state.config);

    const router: NextRouter = useRouter();

    const handleChange = (locale:string) => {
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

    const componentProps = {
        currentStore: lang_prefix,
        handleChange,
        storeList: _normalizeStoreList(availableStores)
    };

    return (
      <StoreSwitcherComponent
        { ...componentProps }
      />
    );
}

export default StoreSwitcherContainer;
