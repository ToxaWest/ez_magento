import dynamic from 'next/dynamic';

const LayeredNavigation = dynamic(() => import('./LayeredNavigation.container'));

export default LayeredNavigation;
