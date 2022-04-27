import LinkComponent from '@component/Link/Link.component';
import PropTypes from 'prop-types';

import { hrefDoctor } from 'Util/Link';

function LinkContainer({ href, className, children }) {
    const componentProps = {
        children,
        className,
        href: hrefDoctor(href)
    };

    return (
      <LinkComponent { ...componentProps } />
    );
}

LinkContainer.propTypes = {
    children: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.node]).isRequired,
    className: PropTypes.string,
    href: PropTypes.string,
    title: PropTypes.string
};

LinkContainer.defaultProps = {
    className: '',
    href: '',
    title: ''
};

export default LinkContainer;
