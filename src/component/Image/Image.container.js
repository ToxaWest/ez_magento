import PropTypes from 'prop-types';

import useUrl from 'Hook/useUrl';

import ImageComponent from './Image.component';

export const DEFAULT_PADDING = 100;

const ImageContainer = (props) => {
    const {
        width,
        height,
        alt,
        src: url,
        className
    } = props;

    const { getUrl } = useUrl();

    const _getCorrectUrl = () => {
        const isAbsoluteUrl = (value) => new RegExp('^(?:[a-z]+:)?//', 'i').test(value);

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
};

ImageContainer.propTypes = {
    alt: PropTypes.string,
    className: PropTypes.string,
    height: PropTypes.number,
    src: PropTypes.string,
    width: PropTypes.number
};

ImageContainer.defaultProps = {
    alt: '',
    className: '',
    height: 0,
    src: '',
    width: 0
};

export default ImageContainer;
