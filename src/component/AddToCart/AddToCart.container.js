import { useTranslations } from 'next-intl';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import useAddSimpleProductToCart from 'Hook/useAddSimpleProductToCart';
import { setInfoNotification, setSuccessNotification } from 'Store/notifiactions';

import AddToCartComponent from './AddToCart.component';

const AddToCartContainer = (props) => {
    const { showQty, product } = props;
    const { __typename, sku } = product;
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(false);
    const t = useTranslations('AddToCart');
    const addSimpleProductToCart = useAddSimpleProductToCart();

    const setQuantity = ({ target: { value } }) => {
        if (qty < 1) {
            return;
        }
        setQty(parseInt(value, 10));
    };

    const dispatch = useDispatch();

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (!qty) {
            dispatch(setInfoNotification('qty is required'));
            setLoading(false);
            return;
        }
        if (__typename === 'SimpleProduct') {
            addSimpleProductToCart([{
                data: {
                    quantity: qty,
                    sku
                }
            }]).then((ok) => {
                if (ok) {
                    dispatch(setSuccessNotification(t('added success')));
                }
                setLoading(false);
            });
        }
    };

    const containerProps = {
        loading,
        qty,
        setQuantity,
        showQty,
        submit
    };

    return (
      <AddToCartComponent
        { ...containerProps }
      />
    );
};

AddToCartContainer.propTypes = {
    product: PropTypes.shape({
        __typename: PropTypes.oneOf(['SimpleProduct']),
        sku: PropTypes.string
    }).isRequired,
    showQty: PropTypes.bool
};
AddToCartContainer.defaultProps = {
    showQty: false
};

export default AddToCartContainer;
