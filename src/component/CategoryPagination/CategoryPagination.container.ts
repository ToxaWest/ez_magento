import { RootState } from '@store/index';
import Pagination from '@ui/Pagination';
import { createElement } from 'react';
import { useSelector } from 'react-redux';

function CategoryPaginationContainer() {
    const { page_info } = useSelector((state: RootState) => state.products.productsInformation);

    const containerProps = {
        page_info
    };

    return createElement(Pagination, containerProps);
}

export default CategoryPaginationContainer;
