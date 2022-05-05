import dynamic from 'next/dynamic';

const MyAccountWishlist = dynamic(() => import('./MyAccountWishlist.container'));

export default MyAccountWishlist;
