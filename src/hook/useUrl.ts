import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

interface getUrlInterface {
    subPath?: string,
    url?: string,
    isMediaPath?: boolean
}

const useUrl = () => {
    const { secure_base_media_url, secure_base_url } = useSelector((state: RootState) => state.config.config);

    const getUrl = ({ url, subPath = '', isMediaPath }: getUrlInterface) => {
        if (!url) {
            return url;
        }
        const baseUrl = isMediaPath
            ? secure_base_media_url || '/media/'
            : secure_base_url;

        return `${ baseUrl }${ subPath }${ url }`;
    };

    return { getUrl };
};

export default useUrl;
