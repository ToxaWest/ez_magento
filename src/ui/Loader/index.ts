import dynamic from 'next/dynamic';

const Loader = dynamic(() => import('./Loader.component'));

export default Loader;
