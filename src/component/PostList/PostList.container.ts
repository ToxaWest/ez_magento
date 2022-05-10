import { RootState } from '@store/index';
import { createElement, ReactElement } from 'react';
import { useSelector } from 'react-redux';

import PostListComponent from './PostList.component';

function PostListContainer(): ReactElement {
    const { items } = useSelector((state: RootState) => state.blog.blogPosts);

    return createElement(PostListComponent, { items });
}

export default PostListContainer;
