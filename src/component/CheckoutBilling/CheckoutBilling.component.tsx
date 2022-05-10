import { CHECKBOX_TYPE } from '@component/Field/Field.config';
import Form from '@component/Form';
import useSetBillingAddressOnCart from '@hook/useSetBillingAddressOnCart';
import useUserAddress from '@hook/useUserAddress';
import { CHECKOUT_ROUTE_PATHNAME, PAYMENT } from '@route/CheckoutPage/CheckoutPage.config';
import { RootState } from '@store/index';
import Loader from '@ui/Loader';
import { _normalizeAddressAsMagentoStyle, fieldsInterface } from '@util/Address';
import { NextRouter, useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';

function CheckoutBillingComponent(): ReactElement {
    const [sameAsShipping, setSameAsShipping] = useState(true);
    const router: NextRouter = useRouter();
    const { billing_address } = useSelector((state: RootState) => state.cart.cart);
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
    const onSubmit = (values: fieldsInterface): void => {
        setBillingAddress(values).then((ok) => {
            if (ok) {
                router.push({
                    pathname: CHECKOUT_ROUTE_PATHNAME,
                    query: {
                        tab: PAYMENT
                    }
                }).then(() => {}).catch(() => {});
            }
        }).catch(() => {});
    };

    const onChange = ({ values }: { values: fieldsInterface }): void => {
        if (values.same_as_shipping !== sameAsShipping) {
            const { same_as_shipping } = values as { same_as_shipping: boolean };
            setSameAsShipping(same_as_shipping);
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
}

export default CheckoutBillingComponent;
