import styles from './Pagination.module.scss';

import { RootState } from '@store/index';
import { setUrlQuery } from '@util/Link';
import classNames from 'classnames';
import { NextRouter, useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

interface CategoryPaginationComponentInterface {
    page_info: PageInfoInterface
}
function CategoryPaginationComponent(props: CategoryPaginationComponentInterface) {
    const {
        page_info: { total_pages }
    } = props;

    const {
        anchor_text_for_next, anchor_text_for_previous, pagination_frame = 5
    } = useSelector((state: RootState) => state.config.config);

    const router: NextRouter = useRouter();
    const { query: { page: p = '1' } } = router;

    const current_page = parseInt(p as string, 10);

    const onPageSelect = (page: number) => {
        setUrlQuery(router, {
            page: page === 1 ? null : page
        });
    };

    const t = useTranslations('CategoryPagination');

    const renderPageIcon = (isNext = false) => (
        <span
          className={ cx(
              styles.CategoryPaginationIcon,
              { [styles.CategoryPaginationIcon_isNext]: isNext },
          ) }
        >
                { isNext
                    ? <span className={ styles.CategoryPaginationIconLabel }>{ t('Next') }</span>
                    : <span className={ styles.CategoryPaginationIconLabel }>{ t('Prev') }</span> }
        </span>
    );

    const renderPageLink = (
        pageNumber: number,
        children,
        isCurrent = false,
        keyOverride?: string
    ): JSX.Element => (
        <li
          key={ keyOverride || pageNumber }
          className={ cx(
              styles.CategoryPaginationListItem,
              { [styles.current]: isCurrent }
          ) }
        >
            <button onClick={ () => onPageSelect(pageNumber) } disabled={ isCurrent }>
                { children }
            </button>
        </li>
    );

    const renderPreviousPageLink = () => {
        if (current_page <= 1) {
            return (
                <li className={ styles.CategoryPaginationListItem } />
            );
        }

        return renderPageLink(
            current_page - 1,
            anchor_text_for_previous || renderPageIcon(),
            false,
            'prev'
        );
    };

    const renderNextPageLink = () => {
        if (current_page > total_pages - 1) {
            return (
                <li className={ styles.CategoryPaginationListItem } />
            );
        }

        return renderPageLink(
            current_page + 1,
            anchor_text_for_next || renderPageIcon(true),
            false,
            'next'
        );
    };

    const renderPageLinks = () => {
        const range = Math.floor(pagination_frame / 2);
        const maxPagesBeforeCurrentPage = (): number => {
            if (current_page >= total_pages - pagination_frame) {
                return (total_pages - current_page > range)
                    ? current_page - (pagination_frame - range - 1)
                    : total_pages - pagination_frame + 1;
            }

            return (current_page <= pagination_frame)
                ? current_page - (pagination_frame - range - 1)
                : current_page - range;
        };

        const maxPagesAfterCurrentPage = (): number => {
            if (current_page <= pagination_frame) {
                return current_page + range < pagination_frame ? pagination_frame : current_page + range;
            }

            return current_page >= total_pages ? total_pages : current_page + range;
        };

        return Array.from({ length: total_pages })
            .reduce((acc: JSX.Element[], _page: undefined, index: number) => {
                const i = index + 1;
                if (maxPagesAfterCurrentPage() >= i && maxPagesBeforeCurrentPage() <= i) {
                    return [...acc, renderPageLink(
                        i,
                        i.toString(),
                        i === current_page,
                    )];
                }

                return acc;
            }, []) as JSX.Element[];
    };

    if (total_pages === 1) {
        return <nav className={ styles.wrapper } />;
    }

    return (
        <nav className={ styles.wrapper }>
            <ul className={ styles.CategoryPagination }>
                { renderPageLink(1, 'first') }
                { renderPreviousPageLink() }
                { renderPageLinks() }
                { renderNextPageLink() }
                { renderPageLink(total_pages, 'last') }
            </ul>
        </nav>
    );
}

export default CategoryPaginationComponent;
