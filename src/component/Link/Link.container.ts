import LinkComponent from '@component/Link/Link.component';
import { hrefDoctor } from '@util/Link';
import { createElement, ReactElement, ReactNode } from 'react';
import { UrlObject } from 'url';

interface LinkContainerInterface {
    children?: ReactNode | undefined,
    className?: string,
    href?: string | UrlObject
    title?: string
}

function LinkContainer({
    children, className, href, title
}: LinkContainerInterface): ReactElement {
    const componentProps = {
        className,
        title,
        href: typeof href === 'string' ? hrefDoctor(href) : href
    };

    return createElement(LinkComponent, componentProps, children);
}

LinkContainer.defaultProps = {
    children: '',
    className: '',
    href: '',
    title: ''
};

export default LinkContainer;
