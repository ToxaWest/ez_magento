import dynamic from 'next/dynamic';

const ProductPrice = dynamic(() => import('./ProductPrice.component'));

export default ProductPrice;
