import ProductListComponent from '@component/ProductList/ProductList.component';
import { useSelector } from 'react-redux';

function ProductListContainer() {
    const { productList: { items } } = useSelector((state) => state.products);
    const containerProps = {
        items
    };

    return (
      <ProductListComponent { ...containerProps } />
    );
}

export default ProductListContainer;
