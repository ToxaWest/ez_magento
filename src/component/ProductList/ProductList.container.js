import { useSelector } from 'react-redux';

import ProductListComponent from 'Component/ProductList/ProductList.component';

const ProductListContainer = () => {
    const { productList: { items } } = useSelector((state) => state.products);
    const containerProps = {
        items
    };

    return (
      <ProductListComponent { ...containerProps } />
    );
};

export default ProductListContainer;
