import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const Image = dynamic(() => import('./Image.container'));

Image.propTypes = {
    alt: PropTypes.string,
    className: PropTypes.string,
    height: PropTypes.number,
    src: PropTypes.string,
    width: PropTypes.number
};

Image.defaultProps = {
    alt: '',
    className: '',
    height: 0,
    src: '',
    width: 0
};
export default Image;
