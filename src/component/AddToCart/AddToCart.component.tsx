import Button from '@ui/Button';
import { useTranslations } from 'next-intl';
import { ChangeEventHandler, MouseEventHandler, useId } from 'react';

type AddToCartComponentInterface = {
  loading: boolean,
  qty: number,
  setQuantity: ChangeEventHandler<HTMLInputElement>,
  showQty: boolean,
  submit: MouseEventHandler<object>
};

function AddToCartComponent({
    showQty, qty, setQuantity, submit, loading
}: AddToCartComponentInterface): JSX.Element {
    const t = useTranslations('AddToCart');
    const id = useId();
    const renderQtyChanger = () => {
        if (!showQty) {
            return null;
        }

        return (
            <label htmlFor={ id } aria-label="Qty">
                <input
                  key={ id }
                  type="number"
                  value={ qty }
                  onChange={ setQuantity }
                  min={ 1 }
                  step={ 1 }
                />
            </label>

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

export default AddToCartComponent;
