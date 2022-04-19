import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const useUrl = () => {
    const { secure_base_media_url, base_url } = useSelector((state) => state.config.config);

    const getUrl = ({ url, subPath, isMediaPath }) => {
        if (!url) {
            return url;
        }
        const baseUrl = isMediaPath
            ? secure_base_media_url || '/media/'
            : base_url;

        return `${ baseUrl }${ subPath }${ url }`;
    };

    getUrl.propTypes = {
        isMediaPath: PropTypes.bool,
        subPath: PropTypes.string,
        url: PropTypes.string
    };

    return { getUrl };
};

export default useUrl;
