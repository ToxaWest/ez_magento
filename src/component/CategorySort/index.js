import dynamic from 'next/dynamic';

const CategorySort = dynamic(() => import('./CategorySort.container'));

export default CategorySort;
