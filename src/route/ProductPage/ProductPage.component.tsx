import styles from './ProductPage.module.scss';

import AddToCart from '@component/AddToCart';
import ConfigurableOptions from '@component/ConfigurableOptions';
import ProductAttributes from '@component/ProductAttributes';
import ProductMediaGallery from '@component/ProductMediaGallery';
import ProductPrice from '@component/ProductPrice';
import RelatedProducts from '@component/RelatedProducts';
import WishListButton from '@component/WishListButton';
import useCurrentProduct from '@hook/useCurrentProduct';

function ProductPageComponent() {
    const product = useCurrentProduct();

    const { name, sku, price_range } = product;

    return (
        <div className={ styles.wrapper }>
            <ProductMediaGallery className={ styles.gallery } />
            <h1>{ name }</h1>
            <strong>{ sku }</strong>
            <ProductPrice price_range={ price_range } />
            <ConfigurableOptions />
            <WishListButton sku={ sku } />
            <AddToCart
              product={ product }
              showQty
            />
            <div className={ styles.content }>
                <ProductAttributes />
                <RelatedProducts />
            </div>
        </div>
    );
}

export default ProductPageComponent;
