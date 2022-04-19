import dynamic from 'next/dynamic';

const ProductAttributes = dynamic(() => import('./ProductAttributes.component'));
export default ProductAttributes;
