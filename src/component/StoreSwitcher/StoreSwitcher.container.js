import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import client from 'Util/Request/apolloClient';

import StoreSwitcherComponent from './StoreSwitcher.component';

function StoreSwitcherContainer() {
    const _normalizeStoreList = (list) => list.map(({ lang_prefix, store_name, default_display_currency_code }) => ({
        currency_code: default_display_currency_code, label: store_name, value: lang_prefix
    }));
    const { availableStores, config: { lang_prefix } } = useSelector((state) => state.config);

    const router = useRouter();

    const handleChange = (locale) => {
        if (!locale) {
            return;
        }

        if (locale === lang_prefix) {
            return;
        }

        client.clearStore().then(() => {
            router.push(router.asPath, null, { locale });
        });
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
