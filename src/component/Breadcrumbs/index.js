import dynamic from 'next/dynamic';

const Breadcrumbs = dynamic(() => import('./Breadcrumbs.component'));

export default Breadcrumbs;
