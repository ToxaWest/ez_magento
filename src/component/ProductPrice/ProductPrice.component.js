import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { getFinalPrice } from 'Util/Price/price';

const ProductPriceComponent = (props) => {
    const { price_range: { maximum_price, minimum_price } } = props;
    const { discount: { percent_off }, final_price } = maximum_price;
    const isRenderRange = final_price.value !== minimum_price.final_price.value;
    const locale = useSelector((state) => state.config.config.locale.replace('_', '-'));

    const renderDiscount = () => {
        if (percent_off) {
            return <span>{ `${percent_off }%` }</span>;
        }

        return null;
    };

    const renderPriceRange = () => {
        if (isRenderRange) {
            return (
              <span>
                { `${getFinalPrice(minimum_price.final_price, locale) } - ${ getFinalPrice(final_price, locale)}` }
              </span>
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
};

ProductPriceComponent.propTypes = {
    price_range: PropTypes.shape({
        maximum_price: PropTypes.shape({
            discount: PropTypes.shape({
                percent_off: PropTypes.number
            }),
            final_price: PropTypes.shape({
                value: PropTypes.number
            })
        }),
        minimum_price: PropTypes.shape({
            final_price: PropTypes.shape({
                value: PropTypes.number
            })
        })
    }).isRequired
};

export default ProductPriceComponent;
