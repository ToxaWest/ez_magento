import styles from './CategoryPage.module.scss';

import CategoryDescription from '@component/CategoryDescription';
import CategoryPagination from '@component/CategoryPagination';
import CategorySort from '@component/CategorySort';
import LayeredNavigation from '@component/LayeredNavigation';
import ProductList from '@component/ProductList';
import { ReactElement } from 'react';

interface CategoryPageComponentInterface {
    total_count: number
}

function CategoryPageComponent(props: CategoryPageComponentInterface): ReactElement {
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

export default CategoryPageComponent;
