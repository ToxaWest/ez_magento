import dynamic from 'next/dynamic';

const CheckoutSuccessPage = dynamic(() => import('./CheckoutSuccessPage.component'));
export default CheckoutSuccessPage;
