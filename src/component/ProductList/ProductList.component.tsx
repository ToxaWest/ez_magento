import styles from './ProductList.module.scss';

import ProductCard from '@component/ProductCard';
import { childSortInterface } from '@component/ProductCard/ProductCard.types';
import { createElement } from 'react';

interface ProductListComponentInterface {
    items: ProductInterface[]
}

function ProductListComponent({ items }: ProductListComponentInterface) {
    const renderProductCard = (item: ProductInterface) => (
      <ProductCard
        key={ item.id }
        wrapperTag="li"
        renderSort={ {
            image: true,
            div: {
                style: { display: 'flex' },
                renderSort: {
                    price: true,
                    sku: true
                }
            } as childSortInterface,
            link: true,
            addToCart: true
        } }
        product={ item }
      />
    );

    return createElement('ul', {
        className: styles.list
    }, items.map(renderProductCard));
}

export default ProductListComponent;
