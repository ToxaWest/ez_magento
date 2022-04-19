import dynamic from 'next/dynamic';

const MyAccountSignIn = dynamic(() => import('./MyAccountSignIn.component'));

export default MyAccountSignIn;
