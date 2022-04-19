import Form from 'Component/Form';

const MyAccountRegistrationComponent = () => {
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

    const onSubmit = () => {
    };

    return (
        <Form onSubmit={ onSubmit } fields={ fields } />
    );
};

export default MyAccountRegistrationComponent;
