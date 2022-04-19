import dynamic from 'next/dynamic';

const Notifications = dynamic(() => import('./Notifications.component'));
export default Notifications;
