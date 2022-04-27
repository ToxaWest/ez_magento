import styles from './Breadcrumbs.module.scss';

import Link from '@component/Link';
import { useSelector } from 'react-redux';

function BreadcrumbsComponent() {
    const { breadcrumbs, current: { name, url }, showBreadcrumbs } = useSelector((state) => state.breadcrumbs);
    const { show_cms_breadcrumbs } = useSelector((state) => state.config.config);

    const isShowBreadcrumbs = Boolean(show_cms_breadcrumbs);
    if (!isShowBreadcrumbs || !showBreadcrumbs) {
        return null;
    }

    const renderLink = ({ url, name }, index) => (
        <li key={ index } className={ styles.list_item }>
            <Link
              href={ url }
            >
                <meta itemProp="item" content={ url } />
                <span itemProp="name">
                    { name }
                </span>
                <meta itemProp="position" content={ index + 1 } />
            </Link>
        </li>
    );

    const renderCurrent = () => (
        <li className={ styles.list_current }>
            <meta itemProp="item" content={ url } />
            <span itemProp="name">
                { name }
            </span>
            <meta itemProp="position" content={ breadcrumbs.length + 1 } />
        </li>
    );

    return (
        <nav aria-label="Breadcrumbs navigation" className={ styles.wrapper }>
            <ul
              itemScope
              itemType="http://schema.org/BreadcrumbList"
              className={ styles.list }
            >
                { renderLink({ name: 'Home', url: '/' }, -1) }
                { breadcrumbs.map(renderLink) }
                { renderCurrent() }
            </ul>
        </nav>
    );
}

export default BreadcrumbsComponent;
