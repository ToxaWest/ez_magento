import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

const useCurrentProduct = (): ProductInterface => {
    const {
        configurableIndex, singleProduct
    } = useSelector((state: RootState) => state.products);

    const {
        __typename, s_attributes, variants
    } = singleProduct;

    if (__typename === 'ConfigurableProduct') {
        if (configurableIndex !== -1 && variants[configurableIndex]) {
            const variant = variants[configurableIndex].product;
            return {
                ...singleProduct,
                ...variant,
                __typename,
                parent_sku: singleProduct.sku,
                selected_options: singleProduct.configurable_options
                    .reduce((acc, item) => {
                        const { attribute_code, values } = item;
                        const { attribute_options: [{ label }] } = variant.s_attributes
                            .find((v) => v.attribute_code === attribute_code);
                        const { uid } = values.find(({ store_label }) => store_label === label);
                        return [...acc, uid];
                    }, [] as string[]),
                s_attributes: [
                    ...s_attributes.filter(({ attribute_code }) => !variant.s_attributes
                        .some((a) => a.attribute_code === attribute_code)),
                    ...variant.s_attributes
                ]
            };
        }
    }

    return singleProduct;
};

export default useCurrentProduct;
