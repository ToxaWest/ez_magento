import styles from './BundleOptions.module.scss';

import ProductCard from '@component/ProductCard';
import { AppDispatch, RootState } from '@store/index';
import { updateBundleSelectedOptions } from '@store/products.store';
import Select from '@ui/Select';
import { createElement, Fragment, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function BundleOptionsContainer(): ReactElement {
    const { selectedBundleOptions, singleProduct } = useSelector((state: RootState) => state.products);
    const { __typename, items } = singleProduct;
    const dispatch = useDispatch<AppDispatch>();
    if (__typename !== 'BundleProduct') {
        return null;
    }

    const renderItemByType = (item: BundleItem): ReactElement | ReactElement[] | null => {
        const { options, type, uid: itemUid } = item;
        if (type === 'select') {
            const selectedProduct = options.find(
                ({ uid }) => uid === selectedBundleOptions[itemUid]
            )?.product || { small_image: {} } as ProductInterface;

            return createElement(
                Fragment,
                {},
                createElement(Select, {
                    options: options.map(({ label, uid }) => ({ label, value: uid })),
                    defaultValue: selectedBundleOptions[itemUid] as string,
                    placeholder: item.title,
                    onChange: (e) => {
                        dispatch(updateBundleSelectedOptions({ [itemUid]: e as string }));
                    }
                }),
                createElement(ProductCard, {
                    product: selectedProduct,
                    className: styles.select_product,
                    renderSort: {
                        image: Boolean(selectedBundleOptions[itemUid]),
                        title: Boolean(selectedBundleOptions[itemUid])
                    }
                })
            );
        }

        if (type === 'checkbox') {
            const [{ label, uid }] = options;
            return createElement(
                'label',
                { htmlFor: uid, className: styles.checkbox },
                createElement('input', {
                    id: uid,
                    name: itemUid,
                    type,
                    defaultChecked: selectedBundleOptions[itemUid],
                    onChange: ({ target: { checked } }) => {
                        dispatch(updateBundleSelectedOptions({ [itemUid]: checked ? uid : null }));
                    }
                }),
                createElement('span', {}, label)
            );
        }

        if (type === 'multi') {
            return createElement(
                'ul',
                { className: styles.multi, role: 'listitem' },
                options.map(({ product, uid }) => createElement(
                    'li',
                    {
                        role: 'option',
                        tabIndex: -1,
                        'aria-selected': selectedBundleOptions[itemUid]
                            ? selectedBundleOptions[itemUid].indexOf(uid) !== -1
                            : false,
                        onClick: () => {
                            if (!selectedBundleOptions[itemUid]) {
                                dispatch(updateBundleSelectedOptions({ [itemUid]: [uid] }));
                            } else {
                                const index: number = selectedBundleOptions[itemUid].indexOf(uid);
                                const val = Array.from(selectedBundleOptions[itemUid]);
                                if (index === -1) {
                                    val.push(uid);
                                } else {
                                    val.splice(index, 1);
                                }
                                dispatch(updateBundleSelectedOptions({ [itemUid]: val }));
                            }
                        }
                    },
                    createElement(ProductCard, {
                        product,
                        renderSort: {
                            image: true,
                            title: true
                        }
                    })
                ))
            );
        }

        return null;
    };

    return createElement(
        'div',
        { className: styles.wrapper },
        items.map((item) => createElement(
            'div',
            { key: item.uid, className: styles.option },
            createElement('span', {}, item.title),
            renderItemByType(item)
        ))
    );
}

export default BundleOptionsContainer;
