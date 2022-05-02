import styles from './ProductCard.module.scss';

import AddToCart from '@component/AddToCart';
import Image from '@component/Image';
import Link from '@component/Link';
import ProductPrice from '@component/ProductPrice';
import { sortedRender } from '@util/Attributes/Attributes';
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
        small_image: {
            label,
            url: src
        },
        url,
        sku,
        price_range
    } = product;

    const t = useTranslations('ProductCard');

    const renderMap = {
        image: <Image src={ src } alt={ label } height={ 100 } width={ 100 } className={ styles.image } />,
        link: <Link href={ url }>{ name }</Link>,
        price: <ProductPrice price_range={ price_range } />,
        sku: <span>{ t('sku') + sku }</span>,
        addToCart: <AddToCart product={ product } />
    };

    return createElement(wrapperTag, {
        className: styles.wrapper
    }, Object.entries(renderSort).map((r) => sortedRender(r, renderMap)));
}

ProductCardComponent.defaultProps = {
    wrapperTag: 'div',
    renderSort: {
        image: true,
        link: true,
        price: true,
        sku: true
    }
};

export default ProductCardComponent;
