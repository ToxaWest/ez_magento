import dynamic from 'next/dynamic';

const ProductMediaGallery = dynamic(() => import('./ProductMediaGallery.component'));

export default ProductMediaGallery;
