import Form from '@component/Form';
import useGenerateCustomerToken from '@hook/useGenerateCustomerToken';
import { fieldsInterface } from '@util/Address';
import { ReactElement } from 'react';

interface MyAccountSignInComponentInterface {
    onSignIn?: (r: boolean) => void
}

function MyAccountSignInComponent(props: MyAccountSignInComponentInterface): ReactElement {
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

    const onSubmit = (values: fieldsInterface): void => {
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
