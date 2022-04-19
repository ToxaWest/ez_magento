import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CHECKBOX_TYPE } from 'Component/Field/Field.config';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import useSetBillingAddressOnCart from 'Hook/useSetBillingAddressOnCart';
import useUserAddress from 'Hook/useUserAddress';
import { CHECKOUT_ROUTE_PATHNAME, PAYMENT } from 'Route/CheckoutPage/CheckoutPage.config';
import { _normalizeAddressAsMagentoStyle } from 'Util/Address';

const CheckoutBillingComponent = () => {
    const [sameAsShipping, setSameAsShipping] = useState(true);
    const router = useRouter();
    const { billing_address } = useSelector((state) => state.cart.cart);
    const initialAddress = _normalizeAddressAsMagentoStyle(billing_address || {});
    const renderFields = {
        same_as_shipping: {
            type: CHECKBOX_TYPE,
            group: 'checkbox',
            label: 'Same as shipping'
        }
    };

    const fields = useUserAddress({
        fields: renderFields
    });

    const [setBillingAddress, loading] = useSetBillingAddressOnCart();
    const onSubmit = (values) => {
        setBillingAddress(values).then((ok) => {
            if (ok) {
                router.push({
                    pathname: CHECKOUT_ROUTE_PATHNAME,
                    query: {
                        tab: PAYMENT
                    }
                });
            }
        });
    };

    const onChange = ({ values }) => {
        if (values.same_as_shipping !== sameAsShipping) {
            setSameAsShipping(values.same_as_shipping);
        }
    };

    return (
        <>
            <Loader isLoading={ loading } />
            <Form
              onSubmit={ onSubmit }
              initialValues={ {
                  ...initialAddress,
                  same_as_shipping: true
              } }
              onChange={ onChange }
              subscription={ ['values'] }
              fields={ sameAsShipping ? renderFields : fields }
            />
        </>

    );
};

export default CheckoutBillingComponent;
