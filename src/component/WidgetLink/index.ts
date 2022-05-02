import dynamic from 'next/dynamic';

const WidgetLink = dynamic(() => import('./WidgetLink.component'));

export default WidgetLink;
