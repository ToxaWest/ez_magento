import { RootState } from '@store/index';
import { getFinalPrice } from '@util/Price/price';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

function ProductPriceComponent(props: { price_range: ProductPriceRangeInterface }): ReactElement {
    const { price_range: { maximum_price, minimum_price } } = props;
    const { discount: { percent_off }, final_price } = maximum_price;
    const isRenderRange = final_price.value !== minimum_price.final_price.value;
    const locale = useSelector((state: RootState) => state.config.config.locale.replace('_', '-'));

    const renderDiscount = (): ReactElement | null => {
        if (percent_off) {
            return <span>{ `${percent_off }%` }</span>;
        }

        return null;
    };

    const renderPriceRange = (): ReactElement => {
        if (isRenderRange) {
            return (
                <div>
                    <span>{ getFinalPrice(minimum_price.final_price, locale) }</span>
                    <span>{ getFinalPrice(final_price, locale) }</span>
                </div>
            );
        }

        return <span>{ getFinalPrice(final_price, locale) }</span>;
    };

    return (
          <div>
            { renderDiscount() }
            { renderPriceRange() }
          </div>
    );
}

export default ProductPriceComponent;
