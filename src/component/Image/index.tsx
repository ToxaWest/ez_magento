import dynamic from 'next/dynamic';

const Image = dynamic(() => import('./Image.container'));

export default Image;
