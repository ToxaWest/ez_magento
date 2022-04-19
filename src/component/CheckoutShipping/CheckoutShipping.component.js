import PropTypes from 'prop-types';

import Form from 'Component/Form';
import Loader from 'Component/Loader';

const CheckoutShippingComponent = (props) => {
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
};

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
