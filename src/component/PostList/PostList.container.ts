import { RootState } from '@store/index';
import { createElement } from 'react';
import { useSelector } from 'react-redux';

import PostListComponent from './PostList.component';

function PostListContainer() {
    const { items } = useSelector((state: RootState) => state.blog.blogPosts);

    return createElement(PostListComponent, { items });
}

export default PostListContainer;
