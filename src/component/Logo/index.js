import dynamic from 'next/dynamic';

const Logo = dynamic(() => import('./Logo.component'));

export default Logo;
