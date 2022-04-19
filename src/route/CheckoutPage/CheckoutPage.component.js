import PropTypes from 'prop-types';
import { createElement } from 'react';

import { notInteractiveClick } from 'Util/Events';

const CheckoutPageComponent = (props) => {
    const {
        tabMap, onClick, tab
    } = props;

    const { label, render } = tabMap[tab] || {};

    const renderTab = () => {
        if (render) {
            return createElement(render);
        }

        return null;
    };

    const renderTabHeading = ([key, { label }], index) => (
            <div
              key={ key }
              role="tab"
              tabIndex="0"
              aria-current={ tab === key }
              onKeyDown={ notInteractiveClick }
              onClick={ () => onClick(key) }
            >
                { `${label} ${index + 1}` }
            </div>
    );

    const tabHeading = () => (
        <div>
            { Object.entries(tabMap)
                .filter(([, { include_in_menu }]) => include_in_menu)
                .map(renderTabHeading) }
        </div>
    );

    return (
        <div>
            { tabHeading() }
            <h1>{ label }</h1>
            { renderTab() }
        </div>
    );
};

CheckoutPageComponent.propTypes = {
    tabMap: PropTypes.shape({}).isRequired,
    onClick: PropTypes.func.isRequired,
    tab: PropTypes.string.isRequired
};

export default CheckoutPageComponent;
