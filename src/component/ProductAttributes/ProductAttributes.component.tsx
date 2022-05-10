import useCurrentProduct from '@hook/useCurrentProduct';
import Table from '@ui/Table';
import { getAttributeValue } from '@util/Attributes/Attributes';
import { ReactElement } from 'react';

function ProductAttributesComponent(): ReactElement {
    const product = useCurrentProduct();

    const { s_attributes } = product;

    const data = s_attributes.reduce((acc, item) => ({ ...acc, [item.attribute_code]: getAttributeValue(item) }), {});

    const head = s_attributes.map(({ attribute_code, attribute_label }) => ({
        key: attribute_code,
        label: attribute_label
    }));

    return (
      <Table head={ head } data={ [data] } isVertical />
    );
}

export default ProductAttributesComponent;
