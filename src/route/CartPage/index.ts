import dynamic from 'next/dynamic';

const CartPage = dynamic(() => import('./CartPage.component'), { ssr: false });

export default CartPage;
