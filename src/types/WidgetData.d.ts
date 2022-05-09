declare interface WidgetSliderInterface {
    slider_id: string,
    type: string
}

declare interface WidgetLinkInterface {
    id_paths: string,
    title: string,
    type: string
}

declare interface WidgetProductListInterface {
    conditions_encoded: string,
    page_var_name: string,
    products_per_page: number,
    show_pager: number,
    title: string,
    type: string
}

declare type WidgetFactoryInterface = WidgetLinkInterface | WidgetSliderInterface | WidgetProductListInterface;
