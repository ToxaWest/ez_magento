import useCurrentProduct from '@hook/useCurrentProduct';
import Table from '@ui/Table';
import { getAttributeValue } from '@util/Attributes/Attributes';

function ProductAttributesComponent() {
    const product = useCurrentProduct();

    const { s_attributes } = product;

    const data = s_attributes.reduce((acc, item) => ({ ...acc, [item.attribute_code]: getAttributeValue(item) }), {});

    const head = s_attributes.map(({ attribute_label, attribute_code }) => ({
        key: attribute_code,
        label: attribute_label
    }));

    return (
      <Table head={ head } data={ [data] } isVertical />
    );
}

export default ProductAttributesComponent;
