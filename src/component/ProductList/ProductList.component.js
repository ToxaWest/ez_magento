import styles from './ProductList.module.scss';

import PropTypes from 'prop-types';

import ProductCard from 'Component/ProductCard';

const ProductListComponent = ({ items }) => {
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
};

ProductListComponent.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number
    })).isRequired
};

export default ProductListComponent;
