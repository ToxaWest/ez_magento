import { useSelector } from 'react-redux';

import CategoryPageComponent from 'Route/CategoryPage/CategoryPage.component';

function CategoryPageContainer() {
    const { total_count } = useSelector((state) => state.products.productsInformation);

    const componentProps = {
        total_count
    };

    return (
      <CategoryPageComponent { ...componentProps } />
    );
}

export default CategoryPageContainer;
