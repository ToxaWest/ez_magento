import styles from './AccountPage.module.scss';

import Link from '@component/Link';
import {
    urlWithAccount
} from '@route/AccountPage/AccountPage.config';
import Icon from '@ui/Icon';
import Loader from '@ui/Loader';
import {
    ComponentType, createElement, FC, ReactElement
} from 'react';

interface AccountPageComponentInterface {
    loading: boolean,
    tab: string,
    tabMap: {
        [key: string]: {
            icon: string,
            label: string,
            onClick?: () => void,
            render: FC | string | ComponentType
        }
    }
}

function AccountPageComponent(props: AccountPageComponentInterface): ReactElement {
    const { loading, tab, tabMap } = props;
    const renderContent = (): ReactElement | null => {
        const selected = tabMap[tab];
        if (selected) {
            return createElement(selected.render);
        }

        return null;
    };

    const renderAccountMenu = (): ReactElement => (
        <ul className={ styles.list }>
            { Object.entries(tabMap).map(([tabKey, { icon, label, onClick }]) => {
                const isCurrent = tabKey === tab;
                const Tag = (isCurrent || onClick) ? 'span' : Link;
                const attributes = {
                    ...(isCurrent ? {} : { href: urlWithAccount(tabKey) }),
                    children: (
                        <>
                            <Icon name={ icon } />
                            { label }
                        </>
                    ),
                    onClick,
                    className: styles.listItem,
                    'aria-current': isCurrent
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
