import dynamic from 'next/dynamic';

const ProductCard = dynamic(() => import('./ProductCard.component'));

export default ProductCard;
