import Link from 'next/link';
import PropTypes from 'prop-types';

const LinkComponent = ({
    href,
    title,
    className,
    children
}) => (
    <Link href={ href }>
        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
        <a className={ className } title={ title }>{ children }</a>
    </Link>
);

LinkComponent.propTypes = {
    children: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.node]).isRequired,
    className: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    title: PropTypes.string
};

LinkComponent.defaultProps = {
    title: ''
};

export default LinkComponent;
