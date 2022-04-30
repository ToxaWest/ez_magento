import Link from 'next/link';
import { ReactElement } from 'react';

interface LinkComponentInterface {
    children: ReactElement | string | ReactElement[],
    className: string,
    href: string,
    title?: string
}

function LinkComponent({
    href,
    title,
    className,
    children
}: LinkComponentInterface) {
    const isAbsoluteUrl = (value: string) => /^(?:[a-z]+:)?\/\//i.test(value);
    const isSpecialLink = (value: string) => /^(sms|tel|mailto):/i.test(value);

    if (!isAbsoluteUrl(href) && !isSpecialLink(href)) {
        return <a className={ className } href={ href } title={ title }>{ children }</a>;
    }

    return (
        <Link href={ href }>
            { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
            <a className={ className } title={ title }>{ children }</a>
        </Link>
    );
}

LinkComponent.defaultProps = {
    title: ''
};

export default LinkComponent;
