import dynamic from 'next/dynamic';

const CategoryPagination = dynamic(() => import('./CategoryPagination.container'));
export default CategoryPagination;
