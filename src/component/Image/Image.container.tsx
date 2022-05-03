import useUrl from '@hook/useUrl';
import { isAbsoluteUrl } from '@util/Link';
import { ReactElement, useState } from 'react';

import ImageComponent from './Image.component';

export const DEFAULT_PADDING = 100;

interface ImageContainerInterface {
    alt?: string,
    className?: string,
    height?: number,
    src?: string,
    width?: number,
    variableRatio?: boolean,
    style?: Record<string, string>
}

function ImageContainer(props: ImageContainerInterface): ReactElement {
    const {
        width,
        height,
        alt,
        src: url,
        className,
        variableRatio
    } = props;

    const { getUrl } = useUrl();
    const [{ naturalHeight, naturalWidth }, setParams] = useState<
        { naturalHeight: number, naturalWidth: number }>({ naturalWidth: width, naturalHeight: height });

    function _getCorrectUrl() {
        if (url === 'false') {
            return null;
        }
        if (isAbsoluteUrl(url)) {
            return url;
        }

        return getUrl({ url });
    }

    const _getWrapperStyle = () => {
        if (naturalHeight && naturalWidth) {
            return {
                '--image-padding-bottom': `${
                    ((naturalHeight / naturalWidth) * DEFAULT_PADDING).toFixed(0)
                }%`
            };
        }

        return {};
    };

    const componentProps = {
        alt,
        className,
        setParams,
        url: _getCorrectUrl(),
        variableRatio,
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
    style: {},
    variableRatio: true
};

export default ImageContainer;
