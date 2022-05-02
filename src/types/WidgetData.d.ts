declare interface WidgetSliderInterface {
    type: string
    slider_id: string
}

declare interface WidgetLinkInterface {
    type: string
    id_paths: string
    title: string
}

declare interface WidgetProductListInterface {
    type: string
    conditions_encoded: string
    page_var_name: string
    products_per_page: number
    show_pager: number
    title: string
}

declare type WidgetFactoryInterface = WidgetLinkInterface | WidgetSliderInterface | WidgetProductListInterface;
