import { RootState } from '@store/index';
import { setUrlQuery } from '@util/Link';
import { NextRouter, useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import CategoryPaginationComponent from './CategoryPagination.component';

function CategoryPaginationContainer() {
    const { page_info } = useSelector((state: RootState) => state.products.productsInformation);
    const {
        pagination_frame, pagination_frame_skip, anchor_text_for_previous, anchor_text_for_next
    } = useSelector((state: RootState) => state.config.config);

    const router: NextRouter = useRouter();

    const onPageSelect = (page: number) => {
        setUrlQuery(router, {
            page: page === 1 ? null : page
        });
    };

    const containerProps = {
        anchor_text_for_next,
        anchor_text_for_previous,
        onPageSelect,
        page_info,
        pagination_frame,
        pagination_frame_skip
    };

    return (
        <CategoryPaginationComponent { ...containerProps } />
    );
}

export default CategoryPaginationContainer;
