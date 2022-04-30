import CategoryPageComponent from '@route/CategoryPage/CategoryPage.component';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

function CategoryPageContainer() {
    const { total_count } = useSelector((state: RootState) => state.products.productsInformation);

    const componentProps = {
        total_count
    };

    return (
      <CategoryPageComponent { ...componentProps } />
    );
}

export default CategoryPageContainer;
