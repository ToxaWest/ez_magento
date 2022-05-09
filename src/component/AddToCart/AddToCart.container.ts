import styles from './AddToCart.module.scss';

import useAddProductsToCart from '@hook/useAddProductsToCart';
import { AppDispatch } from '@store/index';
import { setInfoNotification, setSuccessNotification } from '@store/notifiactions';
import Button from '@ui/Button';
import Render from '@ui/Render';
import { RenderInterface } from '@ui/Render/Render.types';
import { useTranslations } from 'next-intl';
import {
    ChangeEventHandler, createElement, MouseEventHandler, useId, useState
} from 'react';
import { useDispatch } from 'react-redux';

export interface AddToCartContainerInterface {
  product: ProductInterface,
  showQty?: boolean | null
}

function AddToCartContainer(props: AddToCartContainerInterface) {
    const { showQty, product } = props;
    const { __typename, sku, parent_sku } = product;
    const [quantity, setQty] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const id = useId();
    const dispatch = useDispatch<AppDispatch>();
    const t = useTranslations<string>('AddToCart');
    const addProductsToCart = useAddProductsToCart();

    const onChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        if (quantity < 1) {
            return;
        }
        setQty(parseInt(value, 10));
    };

    const onClick: MouseEventHandler<object> = (e) => {
        e.preventDefault();

        if (__typename === 'ConfigurableProduct') {
            if (!parent_sku) {
                dispatch(setInfoNotification('Please select options'));
                return;
            }
        }

        if (!quantity) {
            dispatch(setInfoNotification('qty is required'));
            return;
        }

        setLoading(true);

        const data = {
            quantity,
            sku,
            parent_sku
        };

        addProductsToCart([data]).then((ok) => {
            if (ok) {
                dispatch(setSuccessNotification(t('added success')));
            }
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    };

    return createElement(Render, {
        className: styles.wrapper,
        renderMap: {
            button: createElement(
                Button,
                { disabled: loading, onClick },
                loading ? t('adding') : t('add')
            ),
            qtyCounter: createElement(
                'label',
                { htmlFor: id, 'aria-label': 'Qty' },
                createElement('input', {
                    id, type: 'number', value: quantity, onChange, min: 1, step: 1
                })
            )
        },
        renderSort: {
            qtyCounter: showQty,
            button: true
        }
    } as RenderInterface);
}

AddToCartContainer.defaultProps = {
    showQty: false
};

export default AddToCartContainer;
