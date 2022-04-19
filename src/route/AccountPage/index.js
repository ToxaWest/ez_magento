import dynamic from 'next/dynamic';

const AccountPage = dynamic(() => import('./AccountPage.container'));

export default AccountPage;
