import styles from './Form.module.scss';

import Field from '@component/Field';
import { HIDDEN_TYPE } from '@component/Field/Field.config';
import { sortFieldsByGroup } from '@component/Form/Form.util';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { cloneElement } from 'react';
import { Form, FormSpy } from 'react-final-form';

const cx = classNames.bind(styles);

function FormComponent(props) {
    const {
        onSubmit, fields, renderActions: actionsRender, initialValues, subscription, onChange, id, className
    } = props;

    const renderActions = () => {
        if (actionsRender) {
            return actionsRender();
        }

        return <button type="submit">Submit</button>;
    };

    const renderLabel = (field, children) => {
        const { type, name, label } = field;
        if (type === HIDDEN_TYPE) {
            return cloneElement(children, { key: name });
        }

        return (
            <div key={ name } className={ cx(styles.field, styles[type]) }>
                <label htmlFor={ name }>{ label }</label>
                { children }
            </div>
        );
    };

    const renderFields = () => {
        const groups = sortFieldsByGroup(fields);

        return (
            Object.entries(groups).map(([group, f_list]) => (
                <fieldset
                  key={ group }
                  aria-label={ `${group }_fieldset` }
                  className={ cx(
                      styles.fieldset,
                      styles[`${group }_fieldset`]
                  ) }
                >
                { f_list.map((field) => (
                    renderLabel(field, <Field { ...field } />)
                )) }
                </fieldset>
            ))
        );
    };

    const renderFormSpy = () => {
        if (subscription.length) {
            const subscriptionObj = subscription.reduce((acc, key) => ({ ...acc, [key]: true }), {});

            return (
                <FormSpy
                  subscription={ subscriptionObj }
                  onChange={ onChange }
                />
            );
        }

        return null;
    };

    return (
        <Form
          onSubmit={ onSubmit }
          initialValues={ initialValues }
          render={ ({ handleSubmit }) => (
              <>
                   <form
                     id={ id }
                     onSubmit={ handleSubmit }
                     className={ cx(
                         styles.wrapper,
                         className
                     ) }
                   >
                       { renderFields() }
                       { renderActions() }
                   </form>
                   { renderFormSpy() }
              </>
          ) }
        />
    );
}

FormComponent.propTypes = {
    fields: PropTypes.shape({ [PropTypes.string]: PropTypes.shape({}) }),
    id: PropTypes.string,
    initialValues: PropTypes.shape({}),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    renderActions: PropTypes.func,
    className: PropTypes.string,
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

FormComponent.defaultProps = {
    className: '',
    fields: {},
    id: null,
    initialValues: {},
    onChange: () => {},
    onSubmit: () => {},
    renderActions: null,
    subscription: []
};

export default FormComponent;
