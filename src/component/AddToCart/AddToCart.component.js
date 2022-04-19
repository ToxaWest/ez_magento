import { useTranslations } from 'next-intl';
import PropTypes from 'prop-types';

import Button from 'Ui/Button';

const AddToCartComponent = ({
    showQty, qty, setQuantity, submit, loading
}) => {
    const t = useTranslations('AddToCart');
    return (
      <div>
        { showQty && (
        <input
          type="number"
          value={ qty }
          onChange={ setQuantity }
          min={ 1 }
          step={ 1 }
        />
        ) }
        <Button disabled={ loading } onClick={ submit }>
            { loading ? t('adding') : t('add') }
        </Button>
      </div>
    );
};

AddToCartComponent.propTypes = {
    loading: PropTypes.bool.isRequired,
    qty: PropTypes.number.isRequired,
    setQuantity: PropTypes.func.isRequired,
    showQty: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired
};

export default AddToCartComponent;
