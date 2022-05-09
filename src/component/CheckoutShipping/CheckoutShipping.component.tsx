import Form from '@component/Form';
import Loader from '@ui/Loader';
import { fieldsInterface } from '@util/Address';

interface CheckoutShippingComponentInterface {
    defaultValues?: initialValuesForm,
    fields: fieldsInterface,
    onSubmit: onSubmitForm,
    loading: boolean
}

function CheckoutShippingComponent(props: CheckoutShippingComponentInterface) {
    const {
        defaultValues, fields, loading, onSubmit
    } = props;

    return (
        <>
            <Loader isLoading={ loading } />
            <Form
              fields={ fields }
              initialValues={ defaultValues }
              onSubmit={ onSubmit }
            />
        </>

    );
}

CheckoutShippingComponent.defaultProps = {
    defaultValues: {}
};

export default CheckoutShippingComponent;
