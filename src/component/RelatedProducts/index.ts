import dynamic from 'next/dynamic';

const RelatedProducts = dynamic(() => import('./RelatedProducts.component'));

export default RelatedProducts;
