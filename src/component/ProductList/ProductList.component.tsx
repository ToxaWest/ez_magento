import styles from './ProductList.module.scss';

import ProductCard from '@component/ProductCard';
import { createElement, ReactElement } from 'react';

interface ProductListComponentInterface {
    items: ProductInterface[]
}

function ProductListComponent({ items }: ProductListComponentInterface): ReactElement {
    const renderProductCard = (item: ProductInterface): ReactElement => (
        createElement(ProductCard, {
            key: item.id,
            wrapperTag: 'li',
            product: item
        })
    );

    return createElement('ul', {
        className: styles.list
    }, items.map(renderProductCard));
}

export default ProductListComponent;
