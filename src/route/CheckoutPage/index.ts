import dynamic from 'next/dynamic';

const CheckoutPage = dynamic(() => import('./CheckoutPage.container'), { ssr: false });

export default CheckoutPage;
