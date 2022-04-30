import { RootState } from '@store/index';
import { getFinalPrice } from '@util/Price/price';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

function ProductPriceComponent(props: { price_range: ProductPriceRangeInterface }): ReactElement {
    const { price_range: { maximum_price, minimum_price } } = props;
    const { discount: { percent_off }, final_price } = maximum_price;
    const isRenderRange = final_price.value !== minimum_price.final_price.value;
    const { lang_prefix } = useSelector((state: RootState) => state.config.config);

    const renderDiscount = () => {
        if (percent_off) {
            return <span>{ `${percent_off }%` }</span>;
        }

        return null;
    };

    const renderPriceRange = () => {
        if (isRenderRange) {
            return (
                <div>
                    <span>{ getFinalPrice(minimum_price.final_price, lang_prefix) }</span>
                    <span>{ getFinalPrice(final_price, lang_prefix) }</span>
                </div>
            );
        }

        return <span>{ getFinalPrice(final_price, lang_prefix) }</span>;
    };

    return (
      <div>
        { renderDiscount() }
        { renderPriceRange() }
      </div>
    );
}

export default ProductPriceComponent;
