import styles from './ProductMediaGallery.module.scss';

import Image from '@component/Image';
import useCurrentProduct from '@hook/useCurrentProduct';
import Slider from '@ui/Slider';
import { ReactElement } from 'react';

function ProductMediaGalleryComponent({ className }: { className?: string }) {
    const product = useCurrentProduct();
    const { media_gallery, name } = product;

    const renderSlide = ({ disabled, label, url }: MediaGalleryInterface, index: number) => {
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
