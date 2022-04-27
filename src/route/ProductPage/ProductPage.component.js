import styles from './ProductPage.module.scss';

import AddToCart from '@component/AddToCart';
import ProductAttributes from '@component/ProductAttributes';
import ProductMediaGallery from '@component/ProductMediaGallery';
import ProductPrice from '@component/ProductPrice';
import { useSelector } from 'react-redux';

function ProductPageComponent() {
    const { singleProduct: product } = useSelector((state) => state.products);

    const { name, sku, price_range } = product;

    return (
        <div className={ styles.wrapper }>
            <ProductMediaGallery className={ styles.gallery } />
            <h1>{ name }</h1>
            <strong>{ sku }</strong>
            <ProductAttributes />
            <ProductPrice price_range={ price_range } />
            <AddToCart
              product={ product }
              showQty
            />
        </div>
    );
}

export default ProductPageComponent;
