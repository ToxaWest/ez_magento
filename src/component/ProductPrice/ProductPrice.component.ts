import styles from './ProductPrice.module.scss';

import { RootState } from '@store/index';
import { getFinalPrice } from '@util/Price/price';
import { createElement, ReactElement } from 'react';
import { useSelector } from 'react-redux';

function ProductPriceComponent(props: { price_range: ProductPriceRangeInterface }): ReactElement {
    const { price_range: { maximum_price, minimum_price } } = props;
    const { discount: { percent_off }, final_price } = maximum_price;
    const isRenderRange = final_price.value !== minimum_price.final_price.value;
    const locale = useSelector((state: RootState) => state.config.config.locale.replace('_', '-'));

    const renderDiscount = (): ReactElement | null => {
        if (percent_off) {
            return createElement('span', {
                className: styles.discount
            }, `-${Math.ceil(percent_off) }%`);
        }

        return null;
    };

    const renderPriceRange = (): ReactElement => {
        const finalPrice = createElement('span', {
            className: styles.current
        }, getFinalPrice(final_price, locale));

        if (isRenderRange) {
            return createElement(
                'div',
                {},
                createElement('span', {}, getFinalPrice(minimum_price.final_price, locale)),
                ' - ',
                finalPrice
            );
        }

        return finalPrice;
    };

    return createElement(
        'div',
        {
            className: styles.wrapper
        },
        renderDiscount(),
        renderPriceRange()
    );
}

export default ProductPriceComponent;
