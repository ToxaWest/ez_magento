import dynamic from 'next/dynamic';

const ProductPage = dynamic(() => import('./ProductPage.component'));

export default ProductPage;
