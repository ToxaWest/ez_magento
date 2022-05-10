import CategorySortComponent from '@component/CategorySort/CategorySort.component';
import { RootState } from '@store/index';
import { setUrlQuery } from '@util/Link';
import { NextRouter, useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

function CategorySortContainer(): ReactElement {
    const { sort_fields: { default: default_sort, options } } = useSelector(
        (state: RootState) => state.products.productsInformation,
    );

    const router: NextRouter = useRouter();
    const { query: { sort } } = router;

    const onSortChange = (value: string): void => {
        const sort_direction = (sort as string || default_sort) === value ? 'DESC' : 'ASC';
        setUrlQuery(router, { sort: value, sort_direction });
    };

    const getDefault = (): string => {
        if (sort) {
            return sort as string;
        }
        if (default_sort) {
            return options.find(({ value }) => value === default_sort).value;
        }

        return '';
    };

    const containerProps = {
        defaultSort: getDefault(),
        onSortChange,
        options
    };

    return (
      <CategorySortComponent { ...containerProps } />
    );
}

export default CategorySortContainer;
