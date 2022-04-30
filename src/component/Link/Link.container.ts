import LinkComponent from '@component/Link/Link.component';
import { hrefDoctor } from '@util/Link';
import { createElement, ReactElement } from 'react';

interface LinkContainerInterface {
    children?: ReactElement | string | ReactElement[],
    className?: string,
    href?: string,
    title?: string
}

function LinkContainer({
    href, className, children, title
}: LinkContainerInterface) {
    const componentProps = {
        children,
        className,
        title,
        href: hrefDoctor(href)
    };

    return createElement(LinkComponent, componentProps);
}

LinkContainer.defaultProps = {
    children: '',
    className: '',
    href: '',
    title: ''
};

export default LinkContainer;
