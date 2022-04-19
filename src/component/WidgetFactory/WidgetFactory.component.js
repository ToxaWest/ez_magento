/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

// import FormRenderResolver from 'Component/Form/Form.renderResolver';
// import {
//     CATALOG_LINK_LIST,
//     CATALOG_PRODUCT_LIST, FORM, INSTAGRAM,
//     NEW_PRODUCTS,
//     RECENTLY_VIEWED,
//     SLIDER
// } from './WidgetFactory.config';

// export const ProductListWidget = dynamic(() => import('Component/ProductListWidget'));
// export const NewProducts = dynamic(() => import('Component/NewProducts'));
// export const HomeSlider = dynamic(() => import('Component/SliderWidget'));
// export const RecentlyViewedWidget = dynamic(() => import('Component/RecentlyViewedWidget'));
// export const CatalogLinkList = dynamic(() => import('Component/CatalogLinkList'));
// export const Instagram = dynamic(() => import('Component/Instagram'));

/** @namespace Component/WidgetFactory/Component */
export class WidgetFactory extends PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired
    };

    renderMap = {
        // [SLIDER]: {
        //     component: HomeSlider
        // },
        // [NEW_PRODUCTS]: {
        //     component: NewProducts
        // },
        // [CATALOG_PRODUCT_LIST]: {
        //     component: ProductListWidget
        // },
        // [CATALOG_LINK_LIST]: {
        //     component: CatalogLinkList
        // },
        // [RECENTLY_VIEWED]: {
        //     component: RecentlyViewedWidget
        // },
        // [INSTAGRAM]: {
        //     component: Instagram
        // },
        // [FORM]: {
        //     component: FormRenderResolver
        // }
    };

    renderContent() {
        const { type } = this.props;

        const {
            component: Widget
        } = this.renderMap[type] || {};

        if (Widget !== undefined) {
            return (
                <Widget { ...this.props } />
            );
        }

        return null;
    }

    render() {
        return (
            this.renderContent()
        );
    }
}

export default WidgetFactory;
