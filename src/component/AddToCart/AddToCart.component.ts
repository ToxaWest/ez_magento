import Button from '@ui/Button';
import Render from '@ui/Render';
import { RenderInterface } from '@ui/Render/Render.types';
import { useTranslations } from 'next-intl';
import {
    ChangeEventHandler, createElement, MouseEventHandler, useId
} from 'react';

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

    return createElement(Render, {
        renderMap: {
            button: createElement(
                Button,
                { disabled: loading, onClick: submit },
                loading ? t('adding') : t('add')
            ),
            qtyCounter: createElement(
                'label',
                { htmlFor: id, 'aria-label': 'Qty' },
                createElement('input', {
                    id, type: 'number', value: qty, onChange: setQuantity, min: 1, step: 1
                })
            )
        },
        renderSort: {
            qtyCounter: showQty,
            button: true
        }
    } as RenderInterface);
}

export default AddToCartComponent;
