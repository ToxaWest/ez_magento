import Form from '@component/Form';
import useGenerateCustomerToken from '@hook/useGenerateCustomerToken';
import { fieldsInterface } from '@util/Address';

interface MyAccountSignInComponentInterface {
    onSignIn?: (r: boolean) => void
}

function MyAccountSignInComponent(props: MyAccountSignInComponentInterface) {
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

    const onSubmit = (values: fieldsInterface) => {
        signIn(values).then(onSignIn).catch(() => {});
    };

    return (
        <Form onSubmit={ onSubmit } fields={ fields } />
    );
}

MyAccountSignInComponent.defaultProps = {
    onSignIn: () => {}
};

export default MyAccountSignInComponent;
