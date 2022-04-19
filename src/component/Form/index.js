import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const Form = dynamic(() => import('./Form.component'));
Form.propTypes = {
    fields: PropTypes.shape({ [PropTypes.string]: PropTypes.shape({}) }),
    initialValues: PropTypes.shape({}),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    renderActions: PropTypes.func,
    subscription: PropTypes.arrayOf(PropTypes.oneOf([
        'values', 'valid',
        'active',
        'dirty',
        'dirtyFields',
        'dirtyFieldsSinceLastSubmit',
        'dirtySinceLastSubmit',
        'modifiedSinceLastSubmit',
        'error',
        'errors',
        'hasSubmitErrors',
        'hasValidationErrors',
        'initialValues',
        'invalid',
        'modified',
        'pristine',
        'submitError',
        'submitErrors',
        'submitFailed',
        'submitting',
        'submitSucceeded',
        'touched',
        'valid',
        'validating',
        'values',
        'visited'
    ]))
};
export default Form;
