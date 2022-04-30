import ProductListComponent from '@component/ProductList/ProductList.component';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

function ProductListContainer() {
    const { productList: { items } } = useSelector((state:RootState) => state.products);
    const containerProps = {
        items
    };

    return (
      <ProductListComponent { ...containerProps } />
    );
}

export default ProductListContainer;
