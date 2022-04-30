import styles from './ProductMediaGallery.module.scss';

import Image from '@component/Image';
import { RootState } from '@store/index';
import Slider from '@ui/Slider';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

function ProductMediaGalleryComponent({ className }: { className?: string }) {
    const { singleProduct: { media_gallery, name } } = useSelector((state: RootState) => state.products);

    const renderSlide = ({ disabled, url, label }: MediaGalleryInterface, index: number) => {
        if (disabled) {
            return null;
        }

        return (
          <Image key={ index } alt={ label || name } src={ url } className={ styles.image } />
        );
    };

    return (
        <Slider className={ className }>
          { media_gallery.map(renderSlide) as ReactElement[] }
        </Slider>
    );
}

ProductMediaGalleryComponent.defaultProps = {
    className: ''
};

export default ProductMediaGalleryComponent;
