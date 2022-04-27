import Form from '@component/Form';
import useGenerateCustomerToken from '@hook/useGenerateCustomerToken';
import PropTypes from 'prop-types';

function MyAccountSignInComponent(props) {
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
}

MyAccountSignInComponent.propTypes = {
    onSignIn: PropTypes.func
};

MyAccountSignInComponent.defaultProps = {
    onSignIn: () => {}
};

export default MyAccountSignInComponent;
