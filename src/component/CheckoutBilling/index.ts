import dynamic from 'next/dynamic';

const CheckoutBilling = dynamic(() => import('./CheckoutBilling.component'));

export default CheckoutBilling;
