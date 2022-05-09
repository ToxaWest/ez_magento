import styles from './Logo.module.scss';

import Image from '@component/Image';
import Link from '@component/Link';
import { RootState } from '@store/index';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const LogoComponent = () => {
    const {
        header_logo_src, logo_alt, logo_height, logo_width, name, secure_base_media_url
    } = useSelector((state: RootState) => state.config.config);

    const router = useRouter();

    const isHome = router.asPath === '/';

    const wrapper = (children) => {
        if (isHome) {
            return (
                <div className={ styles.wrapper }>{ children }</div>
            );
        }

        return <Link href="/" className={ styles.wrapper } title={ name }>{ children }</Link>;
    };

    const getSrc = () => {
        if (header_logo_src) {
            return `${secure_base_media_url}/logo/${ header_logo_src}`;
        }

        return null;
    };

    return wrapper(
        <Image
          alt={ logo_alt || 'ez magento' }
          src={ getSrc() }
          width={ logo_width }
          height={ logo_height }
        />,
    );
};

export default LogoComponent;
