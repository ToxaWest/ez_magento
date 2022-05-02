import styles from './Image.module.scss';

import classNames from 'classnames';
import Image from 'next/image';

const cx = classNames.bind(styles);

interface ImageComponentInterface {
    alt?: string,
    className: string,
    url?: string,
    wrapperStyle: object,
    setParams: ({ naturalHeight, naturalWidth }: { naturalHeight: number, naturalWidth: number }) => void
}

function ImageComponent(props: ImageComponentInterface) {
    const {
        url,
        alt,
        wrapperStyle,
        className,
        setParams
    } = props;

    const renderImage = () => {
        if (!url) {
            return <span className={ styles.ImageContent }>Image not specified</span>;
        }

        return (
          <Image
            src={ url }
            alt={ alt }
            draggable={ false }
            onLoadingComplete={ setParams }
            layout="fill"
            className={ cx(
                styles.ImageImage,
            ) }
          />
        );
    };

    return (
      <div
        style={ wrapperStyle }
        className={ cx(
            styles.Image,
            className,
        ) }
      >
        { renderImage() }
      </div>
    );
}

ImageComponent.defaultProps = {
    alt: '',
    url: ''
};

export default ImageComponent;
