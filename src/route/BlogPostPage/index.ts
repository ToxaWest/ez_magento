import dynamic from 'next/dynamic';

const BlogPostPage = dynamic(() => import('./BlogPostPage.container'));
export default BlogPostPage;
