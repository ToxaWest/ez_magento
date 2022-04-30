import dynamic from 'next/dynamic';

const Popup = dynamic(() => import('./Popup.component'));

export default Popup;
