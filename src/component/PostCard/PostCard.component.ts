import styles from './PostCard.module.scss';

import Image from '@component/Image';
import Link from '@component/Link';
import Render from '@ui/Render';
import { renderSortInterface } from '@ui/Render/Render.types';
import { createElement, ReactElement } from 'react';

import useUrl from '../../hook/useUrl';

function PostCardComponent({
    post,
    renderSort,
    wrapperTag
}: { post: BlogPostInterface, renderSort?: renderSortInterface, wrapperTag?: string }): ReactElement {
    const {
        author: {
            author_url,
            name
        },
        creation_time,
        first_image,
        post_url,
        title
    } = post;

    const { replaceUrl } = useUrl();

    const renderMap = {
        image: createElement(Image, {
            alt: title, src: first_image, className: styles.image, variableRatio: false
        }),
        author: createElement(Link, { href: replaceUrl(author_url), title: name }, name),
        created: createElement('span', {}, creation_time),
        link: createElement(Link, { href: replaceUrl(post_url), title }, title)
    };

    return createElement(Render, {
        className: styles.wrapper,
        renderMap,
        renderSort,
        wrapperTag
    });
}

PostCardComponent.defaultProps = {
    wrapperTag: 'div',
    renderSort: {
        image: true,
        link: true,
        author: true,
        created: true
    }
};

export default PostCardComponent;
