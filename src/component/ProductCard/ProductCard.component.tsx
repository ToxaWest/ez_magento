import styles from './ProductCard.module.scss';

import AddToCart from '@component/AddToCart';
import Image from '@component/Image';
import Link from '@component/Link';
import ProductPrice from '@component/ProductPrice';
import WishListButton from '@component/WishListButton';
import Button from '@ui/Button';
import Render from '@ui/Render';
import Select from '@ui/Select';
import { NextRouter, useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import {
    createElement, ReactElement, useMemo, useState
} from 'react';

import { ProductCardComponentInterface } from './ProductCard.types';

function ProductCardComponent({
    product,
    renderSort,
    wrapperTag
}: ProductCardComponentInterface): ReactElement {
    const {
        __typename,
        configurable_options,
        name,
        price_range,
        sku,
        small_image: {
            label,
            url: src
        },
        url
    } = product;

    const router: NextRouter = useRouter();
    const [opened, setOpened] = useState<boolean>(false);
    const [options, selectOption] = useState<{ [key: string]: string }>({});

    const { query: { customFilters } } = router;

    const t = useTranslations('ProductCard');

    const getOptions = useMemo(() => {
        if (__typename === 'ConfigurableProduct' && opened) {
            return (
                <div>
                    { configurable_options.map(
                        ({
                            attribute_code,
                            label: optionLabel,
                            values
                        }) => (
                            <Select
                              key={ attribute_code }
                              onChange={ (e: string) => {
                                  selectOption({ ...options, [attribute_code]: e });
                              } }
                              options={ values.map(({ store_label, uid }) => (
                                  { label: store_label, value: uid }
                              )) }
                              defaultValue={ options[attribute_code] }
                              placeholder={ optionLabel }
                            />
                        )
                    ) }
                </div>
            );
        }

        return <div />;
    }, [opened, options]);

    const href = { pathname: url, query: customFilters ? { customFilters } : {} };

    const renderMap = {
        wishlist: <WishListButton sku={ sku } />,
        image: <Image src={ src } alt={ label } height={ 100 } width={ 100 } className={ styles.image } />,
        link: <Link href={ href } title={ name }>{ name }</Link>,
        price: <ProductPrice price_range={ price_range } />,
        sku: <span>{ t('sku') + sku }</span>,
        options: getOptions,
        addToCart: __typename === 'ConfigurableProduct' && !opened
            ? <Button onClick={ () => setOpened(true) }>Add to cart</Button>
            : (
                <AddToCart product={ {
                    ...product,
                    parent_sku: sku,
                    selected_options: Object.values(options)
                } }
                />
            )
    };

    return createElement(Render, {
        className: styles.wrapper,
        renderSort,
        renderMap,
        wrapperTag
    });
}

ProductCardComponent.defaultProps = {
    wrapperTag: 'div',
    renderSort: {
        wishlist: true,
        image: true,
        link: true,
        price: true,
        sku: true,
        options: true,
        addToCart: true
    }
};

export default ProductCardComponent;
