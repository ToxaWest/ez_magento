import dynamic from 'next/dynamic';

const CartItem = dynamic(() => import('./CartItem.component'));
export default CartItem;
