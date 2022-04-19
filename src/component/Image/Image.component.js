import styles from './Image.module.scss';

import classNames from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const ImageComponent = (props) => {
    const {
        url,
        alt,
        wrapperStyle,
        className
    } = props;

    const renderImage = () => {
        if (!url) {
            return <span className={ styles.ImageContent }>Image not specified</span>;
        }

        return (
          <Image
            src={ url }
            alt={ alt }
            layout="fill"
            className={ cx(
                styles.ImageImage
            ) }
          />
        );
    };

    return (
      <div
        style={ wrapperStyle }
        className={ cx(
            styles.Image,
            className
        ) }
      >
        { renderImage() }
      </div>
    );
};

ImageComponent.propTypes = {
    alt: PropTypes.string,
    className: PropTypes.string.isRequired,
    url: PropTypes.string,
    wrapperStyle: PropTypes.shape({}).isRequired
};

ImageComponent.defaultProps = {
    alt: '',
    url: ''
};

export default ImageComponent;
