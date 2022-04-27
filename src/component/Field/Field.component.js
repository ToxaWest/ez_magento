import styles from './Field.module.scss';

import {
    CHECKBOX_TYPE, composeValidation,
    HIDDEN_TYPE, PHONE_TYPE, SELECT_TYPE, TEXT_TYPE
} from '@component/Field/Field.config';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import Select from 'Ui/Select';

function FieldComponent(props) {
    const {
        type, onChange: onFieldChange, validation, options
    } = props;
    const getField = (field) => {
        const { input } = field;
        switch (type) {
        case SELECT_TYPE:
            const {
                autocomplete, placeholder, input: { value, onChange }
            } = field;

            return (
                <Select
                  options={ options }
                  autocomplete={ autocomplete }
                  defaultValue={ value }
                  placeholder={ placeholder }
                  onChange={ (e) => {
                      onChange(e);
                      onFieldChange(e);
                  } }
                />
            );
        case HIDDEN_TYPE:
            return <input { ...input } style={ { display: 'none' } } />;
        case TEXT_TYPE:
        default:
            return <input { ...input } id={ input.name } />;
        }
    };

    const renderError = ({ meta }) => meta.error && meta.touched && (
        <span className={ styles.error }>{ meta.error }</span>
    );

    const validate = (value, d, e) => {
        if (validation.length) {
            return composeValidation(validation, value, d, e, options);
        }

        return undefined;
    };

    return (
        <Field
          { ...props }
          validate={ validate }
          render={ (field) => (
              <>
                { getField(field) }
                <div>{ renderError(field) }</div>
              </>
          ) }
        />
    );
}

FieldComponent.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({})),
    validation: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.oneOf([TEXT_TYPE, SELECT_TYPE, HIDDEN_TYPE, PHONE_TYPE, CHECKBOX_TYPE])
};

FieldComponent.defaultProps = {
    options: [],
    onChange: () => {},
    validation: [],
    type: TEXT_TYPE
};

export default FieldComponent;
