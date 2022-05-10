declare type initialValuesForm = Partial<Record<string, string | number | boolean>>;
declare type onSubmitForm = (values: initialValuesForm) => void;
declare type FormStateActions = Record<string, string | number | boolean>;

declare interface FieldInterface {
    autocomplete?:boolean,
    defaultValue?: string | number,
    group?: string,
    label?: string,
    onChange?: (e: string | number) => void,
    options?: SelectOptions[],
    placeholder?: string,
    type?: 'text' | 'select' | 'hidden' | 'tel' | 'checkbox',
    validation?: string[]
}
