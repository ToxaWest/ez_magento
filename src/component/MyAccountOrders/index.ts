import dynamic from 'next/dynamic';

const MyAccountOrders = dynamic(() => import('./MyAccountOrders.component'));

export default MyAccountOrders;
