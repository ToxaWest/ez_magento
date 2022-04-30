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
