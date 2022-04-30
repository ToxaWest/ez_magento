import AddToCartComponent from '@component/AddToCart/AddToCart.component';
import useAddSimpleProductToCart from '@hook/useAddSimpleProductToCart';
import { AppDispatch } from '@store/index';
import { setInfoNotification, setSuccessNotification } from '@store/notifiactions';
import { useTranslations } from 'next-intl';
import {
    ChangeEventHandler, createElement, MouseEventHandler, useState
} from 'react';
import { useDispatch } from 'react-redux';

export interface AddToCartContainerInterface {
  product: ProductInterface,
  showQty?: boolean | null
}

function AddToCartContainer(props: AddToCartContainerInterface) {
    const { showQty, product } = props;
    const { __typename, sku } = product;
    const [qty, setQty] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const t = useTranslations<string>('AddToCart');
    const addSimpleProductToCart = useAddSimpleProductToCart();

    const setQuantity: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        if (qty < 1) {
            return;
        }
        setQty(parseInt(value, 10));
    };

    const dispatch = useDispatch<AppDispatch>();

    const submit: MouseEventHandler<object> = (e) => {
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
            }).catch(() => {
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

    return createElement(AddToCartComponent, containerProps);
}

AddToCartContainer.defaultProps = {
    showQty: false
};

export default AddToCartContainer;
