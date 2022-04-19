import dynamic from 'next/dynamic';

const Field = dynamic(() => import('./Field.component'));

export default Field;
