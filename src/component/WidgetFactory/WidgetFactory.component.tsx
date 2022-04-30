import WidgetSlider from '@component/WidgetSlider';

import { SLIDER } from './WidgetFactory.config';

function WidgetFactory(props: WidgetFactoryInterface) {
    const { type } = props;

    const widgetMap = {
        [SLIDER]: WidgetSlider
    };

    const Component = widgetMap[type];
    if (Component) {
        return <Component { ...props } />;
    }

    return null;
}

export default WidgetFactory;
