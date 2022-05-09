import { AppDispatch, RootState } from '@store/index';
import { updateConfigurableIndex } from '@store/products.store';
import Icon from '@ui/Icon';
import Render from '@ui/Render';
import { RenderInterface } from '@ui/Render/Render.types';
import Select from '@ui/Select';
import { getSelectedFiltersFromUrl, setFilterAttribute } from '@util/Link';
import { NextRouter, useRouter } from 'next/router';
import {
    createElement, useEffect, useMemo
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ConfigurableOptionsContainer() {
    const {
        configurableIndex, singleProduct: {
            configurable_options, s_attributes, sku, variants
        }
    } = useSelector((state: RootState) => state.products);
    const router: NextRouter = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { asPath, query: { customFilters } } = router;
    const f = Object.entries(getSelectedFiltersFromUrl(customFilters as string))
        .reduce((acc, [name, [value]]) => ({ ...acc, [name]: value }), {});

    useEffect(() => {
        const updateVariant = () => {
            const index = (variants || []).findIndex((
                { product: { s_attributes: attrs } }
            ) => configurable_options.every(({ attribute_code }) => {
                const c = attrs.find((i) => i.attribute_code === attribute_code);
                if (c && f[attribute_code]) {
                    const { attribute_value } = c;
                    return f[attribute_code] === attribute_value;
                }

                return false;
            }));

            dispatch(updateConfigurableIndex(index));
        };

        updateVariant();
    }, [asPath]);

    const getAttributes = useMemo(() => {
        const attributes = s_attributes.filter((item) => (configurable_options || [])
            .some(({ attribute_code }) => attribute_code === item.attribute_code));

        return attributes.map(({ attribute_code, attribute_label, attribute_options }) => {
            const onChange = (value) => {
                setFilterAttribute(router, { code: attribute_code, value }, true);
            };

            return createElement(Select, {
                onChange,
                defaultValue: f[attribute_code],
                key: attribute_code,
                placeholder: attribute_label,
                options: attribute_options
            });
        });
    }, [sku, asPath]);

    const options = createElement(
        'div',
        {},
        getAttributes
    );

    const reset = createElement(
        'button',
        {
            disabled: configurableIndex === -1,
            onClick: () => {
                router.push(asPath.split('?')[0]).then(() => {}).catch(() => {});
            }
        },
        createElement(Icon, { name: 'restart_alt' })
    );

    return createElement(Render, {
        renderMap: {
            options,
            reset
        }
    } as RenderInterface);
}

export default ConfigurableOptionsContainer;
