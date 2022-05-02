import WidgetCatalogProductList from '@component/WidgetCatalogProductList';
import WidgetLink from '@component/WidgetLink';
import WidgetSlider from '@component/WidgetSlider';
import { createElement, FC } from 'react';

import { CATALOG_LINK_LIST, CATALOG_PRODUCT_LIST, SLIDER } from './WidgetFactory.config';

function WidgetFactory(props: WidgetFactoryInterface) {
    const { type } = props;

    const widgetMap = {
        [SLIDER]: WidgetSlider,
        [CATALOG_PRODUCT_LIST]: WidgetCatalogProductList,
        [CATALOG_LINK_LIST]: WidgetLink
    };

    const Component: FC<WidgetFactoryInterface> = widgetMap[type];
    if (Component) {
        return createElement(Component, props);
    }

    return null;
}

export default WidgetFactory;
