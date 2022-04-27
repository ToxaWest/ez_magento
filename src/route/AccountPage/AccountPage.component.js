import styles from './AccountPage.module.scss';

import Link from '@component/Link';
import Loader from '@component/Loader';
import PropTypes from 'prop-types';
import { createElement } from 'react';

import {
    urlWithAccount
} from 'Route/AccountPage/AccountPage.config';

function AccountPageComponent(props) {
    const { tab, tabMap, loading } = props;
    const renderContent = () => {
        const selected = tabMap[tab];
        if (selected) {
            return createElement(selected.render);
        }

        return null;
    };

    const renderMenuItem = ([tabKey, { label }]) => {
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
    };

    const renderAccountMenu = () => (
        <ul>
            { Object.entries(tabMap).map(renderMenuItem) }
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

AccountPageComponent.propTypes = {
    loading: PropTypes.bool.isRequired,
    tab: PropTypes.string.isRequired,
    tabMap: PropTypes.shape({
        [PropTypes.string]: PropTypes.shape({
            label: PropTypes.string,
            render: PropTypes.node
        })
    }).isRequired
};

export default AccountPageComponent;
