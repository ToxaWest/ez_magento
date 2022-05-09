import styles from './CheckoutPage.module.scss';

import { notInteractiveClick } from '@util/Events';
import { ComponentType, createElement, FC } from 'react';

interface tabInterface {
    include_in_menu?: boolean,
    label: string,
    render: FC | ComponentType
}

interface CheckoutPageComponentInterface {
    onClick: (tab: string) => void,
    tab: string,
    tabMap: {
        [key: string]: tabInterface
    }
}

function CheckoutPageComponent(props: CheckoutPageComponentInterface) {
    const {
        onClick,
        tab,
        tabMap
    } = props;

    const {
        label,
        render
    } = tabMap[tab] || {};

    const renderTab = () => {
        if (render) {
            return createElement(render);
        }

        return null;
    };

    const tabHeading = () => (
        <div role="tablist" className={ styles.tabList }>
            { Object.entries(tabMap)
                .filter(([, { include_in_menu }]) => include_in_menu)
                .map(([key, { label: headingLabel }], index: number) => (
                    <div
                      key={ key }
                      role="tab"
                      tabIndex={ 0 }
                      aria-current={ tab === key }
                      onKeyDown={ notInteractiveClick }
                      title={ headingLabel.toUpperCase() }
                      onClick={ () => onClick(key) }
                    >
                        { index + 1 }
                    </div>
                )) }
        </div>
    );

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.heading }>
                { tabHeading() }
                <h1>{ label }</h1>
            </div>
            { renderTab() }
        </div>
    );
}

export default CheckoutPageComponent;
