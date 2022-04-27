import styles from './CategoryPage.module.scss';

import CategoryDescription from '@component/CategoryDescription';
import CategoryPagination from '@component/CategoryPagination';
import CategorySort from '@component/CategorySort';
import LayeredNavigation from '@component/LayeredNavigation';
import ProductList from '@component/ProductList';
import PropTypes from 'prop-types';

function CategoryPageComponent(props) {
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
}

CategoryPageComponent.propTypes = {
    total_count: PropTypes.number.isRequired
};

export default CategoryPageComponent;
