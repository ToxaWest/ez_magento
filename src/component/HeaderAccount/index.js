import dynamic from 'next/dynamic';

const HeaderAccount = dynamic(() => import('./HeaderAccount.component'));

export default HeaderAccount;
