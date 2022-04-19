import styles from './ProductPage.module.scss';

import { useSelector } from 'react-redux';

import AddToCart from 'Component/AddToCart';
import ProductAttributes from 'Component/ProductAttributes';
import ProductMediaGallery from 'Component/ProductMediaGallery';
import ProductPrice from 'Component/ProductPrice';

const ProductPageComponent = () => {
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
};

export default ProductPageComponent;
