import { RootState } from '@store/index';
import { getAttributeValue } from '@util/Attributes/Attributes';
import { useSelector } from 'react-redux';

function ProductAttributesComponent() {
    const { singleProduct: { s_attributes } } = useSelector((state: RootState) => state.products);

    const renderAttribute = (item: SAttributesInterface) => {
        const { attribute_label, attribute_code } = item;
        return (
          <tr key={ attribute_code }>
            <td><strong>{ attribute_label }</strong></td>
            <td>{ getAttributeValue(item) }</td>
          </tr>
        );
    };

    const renderHead = () => (
        <tr>
            <td>Attribute</td>
            <td>Value</td>
        </tr>
    );

    return (
      <table>
        <thead>
        { renderHead() }
        </thead>
        <tbody>
          { s_attributes.map(renderAttribute) }
        </tbody>
      </table>
    );
}

export default ProductAttributesComponent;
