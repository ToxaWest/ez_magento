/* eslint-disable fp/no-let, fp/no-loops, no-plusplus */
import styles from './CategoryPagination.module.scss';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';

const cx = classNames.bind(styles);

interface CategoryPaginationComponentInterface {
    page_info: { total_pages: number, current_page: number },
    pagination_frame?: number,
    pagination_frame_skip?: number,
    anchor_text_for_previous?: string,
    anchor_text_for_next?: string,
    onPageSelect: (page: number) => void
}
function CategoryPaginationComponent(props: CategoryPaginationComponentInterface) {
    const {
        page_info: { total_pages, current_page },
        pagination_frame,
        pagination_frame_skip,
        anchor_text_for_previous,
        anchor_text_for_next,
        onPageSelect
    } = props;
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
    ) => (
            <li
              key={ pageNumber }
              className={ styles.CategoryPaginationListItem }
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
        );
    };

    const renderPageLinks = () => {
        let pages: JSX.Element[] = [];
        let i: number;

        // Render next pagination links
        for (i = current_page; i <= current_page + pagination_frame; i++) {
            if (i <= total_pages && pages.length <= pagination_frame_skip) {
                pages.push(renderPageLink(
                    i,
                    i.toString(),
                    i === current_page,
                ));
            }
        }

        // Render previous pagination links if necessary
        for (i = 1; i < current_page; i++) {
            if (pages.length < pagination_frame) {
                const id = current_page - i;
                const pageData = renderPageLink(
                    id,
                    id.toString(),
                );

                pages = [pageData, ...pages];
            }
        }

        // Edge case for rendering correct count of next links when current page is 1
        if (current_page === 1 && pages.length < total_pages) {
            for (i = pages.length + 1; i <= pagination_frame; i++) {
                pages.push(renderPageLink(
                    i,
                    i.toString(),
                ));
            }
        }

        return pages;
    };

    if (total_pages === 1) { // do not show pagination, if there are less than one page
        return <ul className={ styles.CategoryPagination } />;
    }

    return (
        <nav className={ styles.wrapper }>
            <ul className={ styles.CategoryPagination }>
                { renderPreviousPageLink() }
                { renderPageLinks() }
                { renderNextPageLink() }
            </ul>
        </nav>
    );
}

CategoryPaginationComponent.defaultProps = {
    anchor_text_for_next: '',
    anchor_text_for_previous: '',
    pagination_frame: 5,
    pagination_frame_skip: 0
};

export default CategoryPaginationComponent;
