declare type initialValuesForm = Partial<Record<string, string | number | boolean>>;
declare type onSubmitForm = (values: initialValuesForm) => void;
declare type FormStateActions = Record<string, string | number | boolean>;
