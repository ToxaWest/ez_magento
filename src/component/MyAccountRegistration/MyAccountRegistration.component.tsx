import Form from '@component/Form';
import { ReactElement } from 'react';

function MyAccountRegistrationComponent(): ReactElement {
    const fields = {
        firstname: {
            label: 'firstname'
        },
        lastname: {
            label: 'lastname'
        },
        email: {
            label: 'email'
        },
        password: {
            label: 'password',
            type: 'password'
        }
    };

    const onSubmit = (): void => {
    };

    return (
        <Form onSubmit={ onSubmit } fields={ fields } />
    );
}

export default MyAccountRegistrationComponent;
