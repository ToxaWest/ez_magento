import styles from './CartItem.module.scss';

import Image from '@component/Image';
import Link from '@component/Link';
import ProductPrice from '@component/ProductPrice';
import useRemoveItemFromCart from '@hook/useRemoveItemFromCart';
import Icon from '@ui/Icon';
import Loader from '@ui/Loader';
import { ReactElement, useState } from 'react';

interface CartItemComponentInterface {
    __typename: 'SimpleCartItem' | 'ConfigurableCartItem',
    configurable_options?: {
        option_label: string
        value_label: string
    }[],
    id: string,
    product: ProductInterface,
    quantity: number
}

function CartItemComponent(props: CartItemComponentInterface): ReactElement {
    const removeItem = useRemoveItemFromCart();
    const [isLoading, setLoading] = useState<boolean>(false);
    const {
        __typename,
        configurable_options,
        id,
        product: {
            name,
            price_range,
            sku,
            small_image,
            url
        },
        quantity
    } = props;

    const remove = (toRemoveId: string) => {
        setLoading(true);
        removeItem(toRemoveId)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const renderConfigurableOptions = () => {
        if (__typename === 'SimpleCartItem') {
            return <div />;
        }

        return (
            <ul>
                { configurable_options.map(({ option_label, value_label }) => (
                    <li key={ option_label }>
                        <strong>{ option_label }</strong>
                        { value_label }
                    </li>
                )) }
            </ul>
        );
    };

    return (
        <div className={ styles.wrapper }>
            <Loader isLoading={ isLoading } />
            <Image
              src={ small_image?.url }
              alt={ small_image?.label || name }
              width={ 100 }
              height={ 100 }
              className={ styles.image }
            />
            <Link href={ url } title={ name }>{ name }</Link>
            <span>{ sku }</span>
            { renderConfigurableOptions() }
            <ProductPrice price_range={ price_range } />
            { `${quantity} items` }
            <button onClick={ () => remove(id) } className={ styles.removeBtn }>
                <Icon name="delete" />
            </button>
        </div>
    );
}

CartItemComponent.defaultProps = {
    configurable_options: []
};

export default CartItemComponent;
