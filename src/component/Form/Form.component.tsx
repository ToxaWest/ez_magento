import styles from './Form.module.scss';

import Field from '@component/Field';
import { HIDDEN_TYPE } from '@component/Field/Field.config';
import { sortedFieldInterface, sortFieldsByGroup } from '@component/Form/Form.util';
import Button from '@ui/Button';
import { fieldsInterface } from '@util/Address';
import classNames from 'classnames';
import { FormState } from 'final-form';
import { cloneElement, ReactElement } from 'react';
import { Form, FormSpy } from 'react-final-form';

const cx = classNames.bind(styles);

interface FormComponentInterface {
    fields?: fieldsInterface,
    id?: string,
    initialValues?: initialValuesForm,
    onChange?: (formState:
        FormState<FormStateActions, initialValuesForm>
    ) => void,
    onSubmit?: onSubmitForm,
    renderActions?: () => ReactElement | null,
    className?: string,
    subscription?: string[]
}

function FormComponent(props: FormComponentInterface) {
    const {
        onSubmit, fields, renderActions: actionsRender, initialValues, subscription, onChange, id, className
    } = props;

    const renderActions = () => {
        if (actionsRender) {
            return actionsRender();
        }

        return <Button type="submit" variant="default" className={ styles.button }>Submit</Button>;
    };

    const renderLabel = (field: sortedFieldInterface, children: ReactElement) => {
        const {
            type, name, label, validation = []
        } = field;

        if (type === HIDDEN_TYPE) {
            return cloneElement(children, { key: name });
        }
        const isRequired = validation.indexOf('notEmpty') !== -1;

        return (
            <div key={ name } className={ cx(styles.field, styles[type]) }>
                <label htmlFor={ name } aria-required={ isRequired }>{ label }</label>
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
                      styles[`${group }_fieldset`],
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
                         className,
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
