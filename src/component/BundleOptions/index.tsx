import dynamic from 'next/dynamic';

const BundleOptions = dynamic(() => import('./BundleOptions.container'));

export default BundleOptions;
