import styles from './PostList.module.scss';

import PostCard from '@component/PostCard';
import { createElement, ReactElement } from 'react';

function PostListComponent({ items }: { items: BlogPostInterface[] }): ReactElement {
    const renderPostCard = (item: BlogPostInterface): ReactElement => (
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
