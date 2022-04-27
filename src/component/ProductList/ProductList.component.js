import styles from './ProductList.module.scss';

import ProductCard from '@component/ProductCard';
import PropTypes from 'prop-types';

function ProductListComponent({ items }) {
    const renderProductCard = (item) => (
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

ProductListComponent.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number
    })).isRequired
};

export default ProductListComponent;
