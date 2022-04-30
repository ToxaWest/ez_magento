declare interface SelectOptions {
    label: string,
    value: number | string
}

declare interface SelectAbstractInterface {
    className?: string,
    defaultValue?: number | string,
    autocomplete?: boolean,
    placeholder?: string,
    options: SelectOptions[]
}
