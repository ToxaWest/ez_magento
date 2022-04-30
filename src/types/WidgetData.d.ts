declare interface WidgetSliderInterface {
    type: string
    slider_id: string
}

declare interface WidgetLinkInterface {
    type: string
    id_paths: string
    title: string
}

declare type WidgetFactoryInterface = WidgetLinkInterface | WidgetSliderInterface;
