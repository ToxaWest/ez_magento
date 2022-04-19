import dynamic from 'next/dynamic';

const MiniCart = dynamic(() => import('./MiniCart.component'));

export default MiniCart;
