import dynamic from 'next/dynamic';

const BlogCategoryPage = dynamic(() => import('./BlogCategoryPage.component'));

export default BlogCategoryPage;
