import dynamic from 'next/dynamic';

const CategoryPage = dynamic(() => import('./CategoryPage.container'));
export default CategoryPage;
