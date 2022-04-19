import PropTypes from 'prop-types';

import Form from 'Component/Form';
import useGenerateCustomerToken from 'Hook/useGenerateCustomerToken';

const MyAccountSignInComponent = (props) => {
    const { onSignIn } = props;
    const fields = {
        email: {
            label: 'email'
        },
        password: {
            label: 'password',
            type: 'password'
        }
    };

    const signIn = useGenerateCustomerToken();

    const onSubmit = (values) => {
        signIn(values).then(onSignIn);
    };

    return (
        <Form onSubmit={ onSubmit } fields={ fields } />
    );
};

MyAccountSignInComponent.propTypes = {
    onSignIn: PropTypes.func
};

MyAccountSignInComponent.defaultProps = {
    onSignIn: () => {}
};

export default MyAccountSignInComponent;
