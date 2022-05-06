import dynamic from 'next/dynamic';

const Select = dynamic(() => import('./Select.container'));

export default Select;
