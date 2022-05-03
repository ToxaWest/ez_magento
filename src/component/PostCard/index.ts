import dynamic from 'next/dynamic';

const PostCard = dynamic(() => import('./PostCard.component'));

export default PostCard;
