import useUrl from '@hook/useUrl';
import { ReactElement } from 'react';

import ImageComponent from './Image.component';

export const DEFAULT_PADDING = 100;

interface ImageContainerInterface {
    alt?: string,
    className?: string,
    height?: number,
    src?: string,
    width?: number,
    style?: Record<string, string>
}

function ImageContainer(props: ImageContainerInterface): ReactElement {
    const {
        width,
        height,
        alt,
        src: url,
        className
    } = props;

    const { getUrl } = useUrl();

    const _getCorrectUrl = () => {
        const isAbsoluteUrl = (value: string) => /^(?:[a-z]+:)?\/\//i.test(value);

        if (isAbsoluteUrl(url)) {
            return url;
        }

        return getUrl({ url });
    };

    const _getWrapperStyle = () => {
        if (width && height) {
            return { paddingBottom: `${((height / width) * DEFAULT_PADDING).toFixed(0)}%` };
        }

        return {};
    };

    const componentProps = {
        alt,
        className,
        url: _getCorrectUrl(),
        wrapperStyle: _getWrapperStyle()
    };

    return (
      <ImageComponent
        { ...componentProps }
      />
    );
}

ImageContainer.defaultProps = {
    alt: '',
    className: '',
    height: 0,
    src: '',
    width: 0,
    style: {}
};

export default ImageContainer;
