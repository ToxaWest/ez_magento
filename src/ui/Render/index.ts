import dynamic from 'next/dynamic';

const Render = dynamic(() => import('./Render.component'));

export default Render;
