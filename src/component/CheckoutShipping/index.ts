import dynamic from 'next/dynamic';

const CheckoutShipping = dynamic(() => import('./CheckoutShipping.container'));
export default CheckoutShipping;
