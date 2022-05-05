import dynamic from 'next/dynamic';

const WishListButton = dynamic(() => import('./WishListButton.container'));

export default WishListButton;
