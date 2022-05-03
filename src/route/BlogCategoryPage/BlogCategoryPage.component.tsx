import styles from './BlogCategoryPage.module.scss';

import Html from '@component/Html';
import PostList from '@component/PostList';
import { RootState } from '@store/index';
import Render from '@ui/Render';
import { RenderInterface } from '@ui/Render/Render.types';
import { createElement } from 'react';
import { useSelector } from 'react-redux';

function BlogCategoryPageComponent() {
    const { title, content, content_heading } = useSelector((state:RootState) => state.blog.currentCategory);

    return createElement(Render, {
        className: styles.wrapper,
        renderMap: {
            title: createElement('h1', {}, title),
            heading: createElement(Html, { content: content_heading }),
            content: createElement(Html, { content }),
            list: createElement(PostList)
        },
        renderSort: {
            title: true,
            div: {
                className: styles.content_heading,
                renderSort: {
                    heading: true
                }
            },
            div_0: {
                className: styles.content,
                renderSort: {
                    content: true
                }
            },
            list: true
        }
    } as RenderInterface);
}

export default BlogCategoryPageComponent;
