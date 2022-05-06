import styles from './CartItem.module.scss';

import Image from '@component/Image';
import Link from '@component/Link';
import ProductPrice from '@component/ProductPrice';
import useRemoveItemFromCart from '@hook/useRemoveItemFromCart';
import Button from '@ui/Button';
import Icon from '@ui/Icon';
import Loader from '@ui/Loader';
import { ReactElement, useState } from 'react';

interface CartItemComponentInterface {
  id: string,
  product: ProductInterface,
  quantity: number
}

function CartItemComponent(props: CartItemComponentInterface): ReactElement {
    const removeItem = useRemoveItemFromCart();
    const [isLoading, setLoading] = useState<boolean>(false);
    const {
        id,
        product: {
            name, sku, price_range, small_image: { label, url: src }, url
        },
        quantity
    } = props;

    const remove = (toRemoveId: string) => {
        setLoading(true);
        removeItem(toRemoveId).then(() => {
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    };

    return (
        <div className={ styles.wrapper }>
            <Loader isLoading={ isLoading } />
            <Image src={ src } alt={ label || name } width={ 100 } height={ 100 } className={ styles.image } />
            <Link href={ url } title={ name }>{ name }</Link>
            <span>{ sku }</span>
            <ProductPrice price_range={ price_range } />
            { `${quantity} items` }
            <Button onClick={ () => remove(id) } className={ styles.removeBtn }><Icon name="delete" /></Button>
        </div>
    );
}

export default CartItemComponent;
