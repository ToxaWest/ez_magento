import { RootState } from '@store/index';
import Table from '@ui/Table';
import { getAttributeValue } from '@util/Attributes/Attributes';
import { useSelector } from 'react-redux';

function ProductAttributesComponent() {
    const { singleProduct: { s_attributes } } = useSelector((state: RootState) => state.products);

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
