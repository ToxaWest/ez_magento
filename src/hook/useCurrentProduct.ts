import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

const useCurrentProduct = () => {
    const {
        singleProduct, configurableIndex
    } = useSelector((state: RootState) => state.products);

    const {
        variants, s_attributes, __typename
    } = singleProduct;

    if (__typename === 'ConfigurableProduct') {
        if (configurableIndex !== -1 && variants[configurableIndex]) {
            const variant = variants[configurableIndex].product;

            return {
                ...singleProduct,
                ...variant,
                parent_sku: singleProduct.sku,
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
