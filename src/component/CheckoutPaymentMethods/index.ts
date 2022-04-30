import dynamic from 'next/dynamic';

const CheckoutPaymentMethods = dynamic(() => import('./CheckoutPaymentMethods.component'));
export default CheckoutPaymentMethods;
