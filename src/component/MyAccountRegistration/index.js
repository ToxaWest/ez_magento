import dynamic from 'next/dynamic';

const MyAccountRegistration = dynamic(() => import('./MyAccountRegistration.component'));

export default MyAccountRegistration;
