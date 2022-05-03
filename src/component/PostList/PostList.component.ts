import styles from './PostList.module.scss';

import PostCard from '@component/PostCard';
import { createElement } from 'react';

function PostListComponent({ items }: { items: BlogPostInterface[] }) {
    const renderPostCard = (item: BlogPostInterface) => (
        createElement(PostCard, {
            key: item.post_id,
            wrapperTag: 'li',
            post: item
        })
    );

    return createElement('ul', {
        className: styles.wrapper
    }, items.map(renderPostCard));
}

export default PostListComponent;
