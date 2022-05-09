declare interface SelectOptions {
    label: string,
    value: number | string
}

declare interface SelectAbstractInterface {
    autocomplete?: boolean,
    className?: string,
    defaultValue?: number | string,
    options: SelectOptions[],
    placeholder?: string
}
