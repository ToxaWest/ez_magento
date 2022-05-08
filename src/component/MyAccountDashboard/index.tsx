import dynamic from 'next/dynamic';

const MyAccountDashboard = dynamic(() => import('./MyAccountDashboard.component'));

export default MyAccountDashboard;
