import styles from './Image.module.scss';

import classNames from 'classnames';
import Image from 'next/image';
import { ReactElement } from 'react';

const cx = classNames.bind(styles);

interface ImageComponentInterface {
    alt?: string,
    className: string,
    setParams: ({ naturalHeight, naturalWidth }: { naturalHeight: number, naturalWidth: number }) => void,
    url?: string,
    variableRatio: boolean,
    wrapperStyle: object
}

function ImageComponent(props: ImageComponentInterface): ReactElement {
    const {
        alt,
        className,
        setParams,
        url,
        variableRatio,
        wrapperStyle
    } = props;

    const renderImage = (): ReactElement => {
        if (!url) {
            return <span className={ styles.ImageContent }>Image not specified</span>;
        }

        return (
          <Image
            src={ url }
            alt={ alt }
            draggable={ false }
            onLoadingComplete={ ({ naturalHeight, naturalWidth }) => {
                if (variableRatio) {
                    setParams({ naturalHeight, naturalWidth });
                }
            } }
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
