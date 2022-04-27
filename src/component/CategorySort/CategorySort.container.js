import CategorySortComponent from '@component/CategorySort/CategorySort.component';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { setUrlQuery } from 'Util/Link';

function CategorySortContainer() {
    const { sort_fields: { options, default: default_sort } } = useSelector(
        (state) => state.products.productsInformation
    );

    const router = useRouter();
    const { query: { sort } } = router;

    const onSortChange = (value) => {
        const sort_direction = (sort || default_sort) === value ? 'DESC' : 'ASC';
        setUrlQuery(router, { sort: value, sort_direction });
    };

    const getDefault = () => {
        if (sort) {
            return sort;
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
