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

interface FieldComponentInterface extends FieldInterface {
    name: string
}

function FieldComponent(props:FieldComponentInterface): ReactElement {
    const {
        onChange: onFieldChange = () => {}, options = [], type = TEXT_TYPE, validation = []
    } = props;

    const getField = (field): ReactElement => {
        const { input, input: { name, onChange, value } } = field as FieldInputProps<object>;
        switch (type) {
        case SELECT_TYPE:
            const {
                autocomplete, placeholder
            } = field as FieldInterface;

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

    const renderError = (meta : FieldMetaState<string | number>): ReactElement => meta.error && meta.touched && (
            <span className={ styles.error }>{ meta.error }</span>
    );

    const validate = (value: string, d, e): undefined | string => {
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

export default FieldComponent;
