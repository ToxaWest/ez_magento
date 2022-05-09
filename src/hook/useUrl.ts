import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

interface getUrlInterface {
    isMediaPath?: boolean,
    subPath?: string,
    url?: string
}

const useUrl = () => {
    const { secure_base_media_url, secure_base_url } = useSelector((state: RootState) => state.config.config);

    const getUrl = ({ isMediaPath, subPath = '', url }: getUrlInterface) => {
        if (!url) {
            return url;
        }
        const baseUrl = isMediaPath
            ? secure_base_media_url || '/media/'
            : secure_base_url;

        return `${ baseUrl }${ subPath }${ url }`;
    };

    const replaceUrl = (url: string) => url.replace(`${process.env.NEXT_PUBLIC_API_URL}`, '');

    return { getUrl, replaceUrl };
};

export default useUrl;
