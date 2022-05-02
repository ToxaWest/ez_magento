import { RootState } from '@store/index';
import { createElement } from 'react';
import { useSelector } from 'react-redux';

import ProductListComponent from './ProductList.component';

function ProductListContainer() {
    const { productList: { items } } = useSelector((state:RootState) => state.products);
    const containerProps = {
        items
    };

    return createElement(ProductListComponent, containerProps);
}

export default ProductListContainer;
