import LinkComponent from '@component/Link/Link.component';
import { hrefDoctor } from '@util/Link';
import { createElement, ReactNode } from 'react';

interface LinkContainerInterface {
    children?: ReactNode | undefined,
    className?: string,
    href?: string,
    title?: string
}

function LinkContainer({
    href, className, children, title
}: LinkContainerInterface) {
    const componentProps = {
        className,
        title,
        href: hrefDoctor(href)
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
