import styles from './CartItem.module.scss';

import Image from '@component/Image';
import Link from '@component/Link';
import Loader from '@component/Loader';
import ProductPrice from '@component/ProductPrice';
import useRemoveItemFromCart from '@hook/useRemoveItemFromCart';
import PropTypes from 'prop-types';
import { useState } from 'react';

import Button from 'Ui/Button';

function CartItemComponent(props) {
    const removeItem = useRemoveItemFromCart();
    const [isLoading, setLoading] = useState(false);
    const {
        id,
        product: {
            name, sku, price_range, small_image: { label, url: src }, url
        },
        quantity
    } = props;

    const remove = (id) => {
        setLoading(true);
        removeItem(id).then(() => {
            setLoading(false);
        });
    };

    return (
        <div className={ styles.wrapper }>
            <Loader isLoading={ isLoading } />
            <Image src={ src } alt={ label || name } width={ 100 } height={ 100 } className={ styles.image } />
                <Link href={ url } alt={ name }>{ name }</Link>
                <span>{ sku }</span>
                <ProductPrice price_range={ price_range } />
                { `${quantity} items` }
            <Button onClick={ () => remove(id) } className={ styles.removeBtn }>remove</Button>
        </div>
    );
}

CartItemComponent.propTypes = {
    id: PropTypes.string.isRequired,
    product: PropTypes.shape({
        name: PropTypes.string,
        price_range: PropTypes.shape({}),
        sku: PropTypes.string,
        small_image: PropTypes.shape({
            label: PropTypes.string,
            url: PropTypes.string
        }),
        url: PropTypes.string
    }).isRequired,
    quantity: PropTypes.number.isRequired
};

export default CartItemComponent;
