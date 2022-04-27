import styles from './ProductCard.module.scss';

import AddToCart from '@component/AddToCart';
import Image from '@component/Image';
import Link from '@component/Link';
import ProductPrice from '@component/ProductPrice';
import { useTranslations } from 'next-intl';
import PropTypes from 'prop-types';

function ProductCardComponent({
    wrapperTag,
    product
}) {
    const Tag = wrapperTag;
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

    return (
        <Tag className={ styles.wrapper }>
            <Image src={ src } alt={ label } height={ 100 } width={ 100 } className={ styles.image } />
            <Link href={ url }>{ name }</Link>
            <ProductPrice price_range={ price_range } />
            <span>{ t('sku') + sku }</span>
            <AddToCart showQty={ false } product={ product } />
        </Tag>
    );
}

ProductCardComponent.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string,
        price_range: PropTypes.shape({}),
        sku: PropTypes.string,
        small_image: PropTypes.shape(
            {
                label: PropTypes.string,
                url: PropTypes.string
            }
        ),
        url: PropTypes.string
    }).isRequired,
    wrapperTag: PropTypes.string
};

ProductCardComponent.defaultProps = {
    wrapperTag: 'div'
};

export default ProductCardComponent;
