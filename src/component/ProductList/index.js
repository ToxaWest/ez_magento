import dynamic from 'next/dynamic';

const ProductList = dynamic(() => import('./ProductList.container'));

export default ProductList;
