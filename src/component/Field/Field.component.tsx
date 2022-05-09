import styles from './Field.module.scss';

import {
    composeValidation,
    HIDDEN_TYPE, SELECT_TYPE, TEXT_TYPE
} from '@component/Field/Field.config';
import Select from '@ui/Select';
import { ReactElement } from 'react';
import {
    Field, FieldInputProps, FieldMetaState
} from 'react-final-form';

interface FieldComponentInterface {
    onChange?: (e: string | number) => void,
    options?: SelectOptions[],
    validation?: string[],
    name: string,
    type?: 'text' | 'select' | 'hidden' | 'tel' | 'checkbox'
}

function FieldComponent(props:FieldComponentInterface): ReactElement {
    const {
        onChange: onFieldChange, options, type, validation
    } = props;

    const getField = (field) => {
        const { input, input: { name, onChange, value } } = field as FieldInputProps<object>;
        switch (type) {
        case SELECT_TYPE:
            const {
                autocomplete, placeholder
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
            return <input { ...input } id={ name } />;
        }
    };

    const renderError = (meta : FieldMetaState<string>) => meta.error && meta.touched && (
            <span className={ styles.error }>{ meta.error }</span>
    );

    const validate = (value: string, d, e) => {
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
                <div>{ renderError(field.meta) }</div>
              </>
          ) }
        />
    );
}
FieldComponent.defaultProps = {
    options: [],
    onChange: () => {},
    validation: [],
    type: TEXT_TYPE
};

export default FieldComponent;
