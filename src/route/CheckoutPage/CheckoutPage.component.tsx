import { notInteractiveClick } from '@util/Events';
import { ComponentType, createElement, FC } from 'react';

interface tabInterface {
    render: FC | ComponentType,
    label: string,
    include_in_menu?: boolean
}

interface CheckoutPageComponentInterface {
    tabMap: {
        [key: string]: tabInterface
    },
    onClick: (tab: string) => void,
    tab: string
}

function CheckoutPageComponent(props: CheckoutPageComponentInterface) {
    const {
        tabMap,
        onClick,
        tab
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
        <div>
            { Object.entries(tabMap)
                .filter(([, { include_in_menu }]) => include_in_menu)
                .map(([key, { label: headingLabel }], index: number) => (
                    <div
                      key={ key }
                      role="tab"
                      tabIndex={ 0 }
                      aria-current={ tab === key }
                      onKeyDown={ notInteractiveClick }
                      onClick={ () => onClick(key) }
                    >
                        { `${headingLabel} ${index + 1}` }
                    </div>
                )) }
        </div>
    );

    return (
        <div>
            { tabHeading() }
            <h1>{ label }</h1>
            { renderTab() }
        </div>
    );
}

export default CheckoutPageComponent;