import dynamic from 'next/dynamic';

const Meta = dynamic(() => import('./Meta.component'));

export default Meta;
