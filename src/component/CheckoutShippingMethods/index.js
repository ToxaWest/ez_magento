import dynamic from 'next/dynamic';

const CheckoutShippingMethods = dynamic(() => import('./CheckoutShippingMethods.component'));

export default CheckoutShippingMethods;
