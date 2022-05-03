import dynamic from 'next/dynamic';

const PostList = dynamic(() => import('./PostList.container'));
export default PostList;
