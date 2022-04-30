import dynamic from 'next/dynamic';

const ExpandableContent = dynamic(() => import('./ExpandableContent.component'));

export default ExpandableContent;
