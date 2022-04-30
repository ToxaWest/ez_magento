import styles from './ProductList.module.scss';

import ProductCard from '@component/ProductCard';

interface ProductListComponentInterface {
    items: ProductInterface[]
}

function ProductListComponent({ items }: ProductListComponentInterface) {
    const renderProductCard = (item: ProductInterface) => (
      <ProductCard
        key={ item.id }
        wrapperTag="li"
        product={ item }
      />
    );

    return (
      <ul className={ styles.list }>
        { items.map(renderProductCard) }
      </ul>
    );
}

export default ProductListComponent;
