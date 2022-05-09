import styles from './ProductCard.module.scss';

import AddToCart from '@component/AddToCart';
import Image from '@component/Image';
import Link from '@component/Link';
import ProductPrice from '@component/ProductPrice';
import WishListButton from '@component/WishListButton';
import Render from '@ui/Render';
import { NextRouter, useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { createElement } from 'react';

import { ProductCardComponentInterface } from './ProductCard.types';

function ProductCardComponent({
    wrapperTag,
    product,
    renderSort
}: ProductCardComponentInterface) {
    const {
        name,
        small_image: { label, url: src },
        url,
        sku,
        price_range
    } = product;

    const router: NextRouter = useRouter();

    const { query: { customFilters } } = router;

    const t = useTranslations('ProductCard');

    const renderMap = {
        wishlist: <WishListButton sku={ sku } />,
        image: <Image src={ src } alt={ label } height={ 100 } width={ 100 } className={ styles.image } />,
        link: <Link
          href={ {
              pathname: url,
              query: customFilters ? {
                  customFilters
              } : {}
          } }
          title={ name }
        >
                { name }
              </Link>,
        price: <ProductPrice price_range={ price_range } />,
        sku: <span>{ t('sku') + sku }</span>,
        addToCart: <AddToCart product={ product } />
    };

    return createElement(Render, {
        className: styles.wrapper,
        renderSort,
        renderMap,
        wrapperTag
    });
}

ProductCardComponent.defaultProps = {
    wrapperTag: 'div',
    renderSort: {
        image: true,
        link: true,
        price: true,
        sku: true,
        addToCart: true
    }
};

export default ProductCardComponent;
