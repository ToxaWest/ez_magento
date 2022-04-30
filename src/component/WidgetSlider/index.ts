import dynamic from 'next/dynamic';

const WidgetSlider = dynamic(() => import('./WidgetSlider.component'));

export default WidgetSlider;
