declare interface AggregationOptionInterface {
    count: number,
    label: string,
    value: string
}

declare interface AggregationsInterface {
    attribute_code: string,
    count: number,
    label: string,
    options: AggregationOptionInterface[]
}
