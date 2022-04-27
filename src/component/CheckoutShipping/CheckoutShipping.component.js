import Form from '@component/Form';
import Loader from '@component/Loader';
import PropTypes from 'prop-types';

function CheckoutShippingComponent(props) {
    const {
        fields, onSubmit, loading, defaultValues
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

CheckoutShippingComponent.propTypes = {
    defaultValues: PropTypes.shape({}),
    fields: PropTypes.shape({
        [PropTypes.string]: PropTypes.shape({})
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

CheckoutShippingComponent.defaultProps = {
    defaultValues: {}
};

export default CheckoutShippingComponent;
