import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { getIsFilterSelected, setFilterAttribute } from 'Util/Link';

import LayeredNavigationComponent from './LayeredNavigation.component';

const LayeredNavigationContainer = () => {
    const { aggregations } = useSelector((state) => state.products.productsInformation);

    const router = useRouter();

    const onSelect = (code, value) => {
        setFilterAttribute(router, { code, value });
    };

    const isSelected = (code, value) => getIsFilterSelected(router, { code, value });

    const containerProps = {
        aggregations,
        isSelected,
        onSelect
    };

    return (
        <LayeredNavigationComponent { ...containerProps } />
    );
};

export default LayeredNavigationContainer;
