import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const ClickOutside = dynamic(() => import('./ClickOutside.component'));
ClickOutside.defaultProps = {
    children: [],
    onClick: () => {}
};

ClickOutside.propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func
};

export default ClickOutside;
