import styles from './AccountPage.module.scss';

import Link from '@component/Link';
import {
    urlWithAccount
} from '@route/AccountPage/AccountPage.config';
import Loader from '@ui/Loader';
import {
    ComponentType, createElement, FC, ReactElement
} from 'react';

interface AccountPageComponentInterface {
    tab: string,
    loading: boolean,
    tabMap: {
        [key: string]: {
            label: string,
            render: FC | string | ComponentType
        }
    }
}

function AccountPageComponent(props: AccountPageComponentInterface): ReactElement {
    const { tab, tabMap, loading } = props;
    const renderContent = () => {
        const selected = tabMap[tab];
        if (selected) {
            return createElement(selected.render);
        }

        return null;
    };

    const renderAccountMenu = () => (
        <ul>
            { Object.entries(tabMap).map(([tabKey, { label }]) => {
                const isCurrent = tabKey === tab;
                const Tag = isCurrent ? 'span' : Link;
                const attributes = {
                    ...(isCurrent ? {} : { href: urlWithAccount(tabKey) }),
                    children: label
                };

                return (
                    <li key={ tabKey }>
                        <Tag { ...attributes } />
                    </li>
                );
            }) }
        </ul>
    );

    return (
        <div className={ styles.wrapper }>
            <h1>{ tabMap[tab]?.label || '' }</h1>
            { renderAccountMenu() }
            <Loader isLoading={ loading } />
            { renderContent() }
        </div>
    );
}

export default AccountPageComponent;