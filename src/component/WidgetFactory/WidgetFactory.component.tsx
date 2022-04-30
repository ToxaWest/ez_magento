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

import { PureComponent } from 'react';

// import FormRenderResolver from '@component/Form/Form.renderResolver';
// import {
//     CATALOG_LINK_LIST,
//     CATALOG_PRODUCT_LIST, FORM, INSTAGRAM,
//     NEW_PRODUCTS,
//     RECENTLY_VIEWED,
//     SLIDER
// } from './WidgetFactory.config';

// export const ProductListWidget = dynamic(() => import('@component/ProductListWidget'));
// export const NewProducts = dynamic(() => import('@component/NewProducts'));
// export const HomeSlider = dynamic(() => import('@component/SliderWidget'));
// export const RecentlyViewedWidget = dynamic(() => import('@component/RecentlyViewedWidget'));
// export const CatalogLinkList = dynamic(() => import('@component/CatalogLinkList'));
// export const Instagram = dynamic(() => import('@component/Instagram'));

/** @namespace Component/WidgetFactory/Component */
export class WidgetFactory extends PureComponent<{ type?: string }> {
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
