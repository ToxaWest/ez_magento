import { useTranslations } from 'next-intl';
import PropTypes from 'prop-types';

import Button from 'Ui/Button';

function AddToCartComponent({
    showQty, qty, setQuantity, submit, loading
}) {
    const t = useTranslations('AddToCart');
    const renderQtyChanger = () => {
        if (!showQty) {
            return null;
        }

        return (
            <input
              type="number"
              value={ qty }
              onChange={ setQuantity }
              min={ 1 }
              step={ 1 }
            />
        );
    };

    return (
      <div>
        { renderQtyChanger() }
        <Button disabled={ loading } onClick={ submit }>
            { loading ? t('adding') : t('add') }
        </Button>
      </div>
    );
}

AddToCartComponent.propTypes = {
    loading: PropTypes.bool.isRequired,
    qty: PropTypes.number.isRequired,
    setQuantity: PropTypes.func.isRequired,
    showQty: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired
};

export default AddToCartComponent;
