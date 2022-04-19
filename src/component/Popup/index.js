import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const Popup = dynamic(() => import('./Popup.component'));
Popup.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
        PropTypes.shape({})
    ]).isRequired,
    classNames: PropTypes.shape({
        content: PropTypes.string,
        wrapper: PropTypes.string
    }),
    id: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    isStatic: PropTypes.bool,
    onClose: PropTypes.func,
    outsideClick: PropTypes.bool
};

Popup.defaultProps = {
    classNames: {
        content: '',
        wrapper: ''
    },
    isActive: false,
    isStatic: false,
    onClose: () => {},
    outsideClick: true
};
export default Popup;
