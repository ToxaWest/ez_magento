import dynamic from 'next/dynamic';

const AddToCart = dynamic(() => import('./AddToCart.container'));

export default AddToCart;
