import styles from '@component/PostCard/PostCard.module.scss';

import Html from '@component/Html';
import Image from '@component/Image';
import Link from '@component/Link';
import useUrl from '@hook/useUrl';
import { RootState } from '@store/index';
import Render from '@ui/Render';
import { RenderInterface } from '@ui/Render/Render.types';
import { createElement } from 'react';
import { useSelector } from 'react-redux';

function BlogPostPageContainer() {
    const {
        title, first_image, author: { author_url, name }, creation_time, filtered_content
    } = useSelector((state: RootState) => state.blog.blogPost);

    const { replaceUrl } = useUrl();

    return createElement(Render, {
        renderMap: {
            title: createElement('h1', {}, title),
            image: createElement(Image, {
                alt: title, src: first_image, className: styles.image, variableRatio: false
            }),
            author: createElement(Link, { href: replaceUrl(author_url), title: name }, name),
            created: createElement('span', {}, creation_time),
            content: createElement(Html, { content: filtered_content })
        }
    } as RenderInterface);
}

export default BlogPostPageContainer;