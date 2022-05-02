import dynamic from 'next/dynamic';

const Slider = dynamic(() => import('./Slider.container'));

export default Slider;
