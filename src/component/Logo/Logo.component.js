import styles from './Logo.module.scss';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Image from 'Component/Image';
import Link from 'Component/Link';

const LogoComponent = () => {
    const {
        logo_alt, logo_height, logo_width, header_logo_src, name, secure_base_media_url
    } = useSelector((state) => state.config.config);

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
          alt={ logo_alt }
          src={ getSrc() }
          width={ logo_width }
          height={ logo_height }
        />
    );
};

export default LogoComponent;
