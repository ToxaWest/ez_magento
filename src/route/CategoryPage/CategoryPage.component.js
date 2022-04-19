import styles from './CategoryPage.module.scss';

import PropTypes from 'prop-types';

import CategoryDescription from 'Component/CategoryDescription';
import CategoryPagination from 'Component/CategoryPagination';
import CategorySort from 'Component/CategorySort';
import LayeredNavigation from 'Component/LayeredNavigation';
import ProductList from 'Component/ProductList';

const CategoryPageComponent = (props) => {
    const { total_count } = props;
    return (
        <div className={ styles.wrapper }>
            <CategoryDescription />
            <span className={ styles.count }>{ `Total count: ${ total_count}` }</span>
            <CategorySort />
            <LayeredNavigation />
            <ProductList />
            <CategoryPagination />
        </div>
    );
};

CategoryPageComponent.propTypes = {
    total_count: PropTypes.number.isRequired
};

export default CategoryPageComponent;
