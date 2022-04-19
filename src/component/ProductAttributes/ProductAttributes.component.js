import { useSelector } from 'react-redux';

import { getAttributeValue } from 'Util/Attributes/Attributes';

const ProductAttributesComponent = () => {
    const { singleProduct: { s_attributes } } = useSelector((state) => state.products);

    const renderAttribute = (item) => {
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
};

export default ProductAttributesComponent;
