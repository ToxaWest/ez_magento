import { isAbsoluteUrl, isSpecialLink } from '@util/Link';
import Link from 'next/link';
import { ReactNode } from 'react';
import { UrlObject } from 'url';

interface LinkComponentInterface {
    children?: ReactNode | undefined,
    className: string,
    href: string | UrlObject,
    title?: string
}

function LinkComponent({
    children,
    className,
    href,
    title
}: LinkComponentInterface) {
    if (typeof href !== 'string' || (!isAbsoluteUrl(href) && !isSpecialLink(href))) {
        return (
            <Link href={ href }>
                { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                <a className={ className } title={ title || 'link' }>{ children }</a>
            </Link>
        );
    }

    return <a className={ className } href={ href } title={ title || 'link' }>{ children }</a>;
}

LinkComponent.defaultProps = {
    title: '',
    children: ''
};

export default LinkComponent;
