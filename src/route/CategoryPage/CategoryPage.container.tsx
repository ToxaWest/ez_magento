import CategoryPageComponent from '@route/CategoryPage/CategoryPage.component';
import { RootState } from '@store/index';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

function CategoryPageContainer(): ReactElement {
    const { total_count } = useSelector((state: RootState) => state.products.productsInformation);

    const componentProps = {
        total_count
    };

    return (
      <CategoryPageComponent { ...componentProps } />
    );
}

export default CategoryPageContainer;
