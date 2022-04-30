import WidgetSlider from '@component/WidgetSlider';

function WidgetFactory(props: WidgetFactoryInterface) {
    const { type } = props;

    const widgetMap = {
        Slider: WidgetSlider
    };

    const Component = widgetMap[type];
    if (Component) {
        return <Component { ...props } />;
    }

    return null;
}

export default WidgetFactory;
