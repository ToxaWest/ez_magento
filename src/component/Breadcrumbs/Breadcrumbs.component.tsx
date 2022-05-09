import styles from './Breadcrumbs.module.scss';

import Link from '@component/Link';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

function BreadcrumbsComponent(): JSX.Element {
    const { breadcrumbs, current: { name, url }, showBreadcrumbs } = useSelector(
        (state: RootState) => state.breadcrumbs,
    );
    const { show_cms_breadcrumbs } = useSelector(
        (state: RootState) => state.config.config,
    );

    const isShowBreadcrumbs = Boolean(show_cms_breadcrumbs);
    if (!isShowBreadcrumbs || !showBreadcrumbs) {
        return null;
    }

    const renderLink = ({ name: linkName, url: linkUrl }: BreadcrumbInterface, index: number) => (
        <li key={ linkName } className={ styles.list_item }>
            <Link href={ linkUrl } title={ linkName }>
                <meta itemProp="item" content={ linkUrl } />
                <span itemProp="name">{ linkName }</span>
                <meta itemProp="position" content={ (index + 1).toString() } />
            </Link>
        </li>
    );

    const renderCurrent = () => (
        <li className={ styles.list_current }>
            <meta itemProp="item" content={ url } />
            <span itemProp="name">{ name }</span>
            <meta itemProp="position" content={ (breadcrumbs.length + 1).toString() } />
        </li>
    );

    return (
        <nav aria-label="Breadcrumbs navigation" className={ styles.wrapper }>
            <ul
              itemScope
              itemType="https://schema.org/BreadcrumbList"
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
