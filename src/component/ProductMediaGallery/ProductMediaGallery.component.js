import styles from './ProductMediaGallery.module.scss';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';

import Image from 'Component/Image';

const ProductMediaGalleryComponent = ({ className }) => {
    const { singleProduct: { media_gallery, name } } = useSelector((state) => state.products);

    const renderSlide = ({ disabled, url, label }, index) => {
        if (disabled) {
            return null;
        }

        return (
          <Image key={ index } alt={ label || name } src={ url } className={ styles.image } />
        );
    };

    return (
        <Slider className={ className }>
          { media_gallery.map(renderSlide) }
        </Slider>
    );
};

ProductMediaGalleryComponent.propTypes = {
    className: PropTypes.string
};
ProductMediaGalleryComponent.defaultProps = {
    className: ''
};

export default ProductMediaGalleryComponent;
