import { RootState } from '@store/index';
import { getIsFilterSelected, setFilterAttribute } from '@util/Link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import LayeredNavigationComponent from './LayeredNavigation.component';

function LayeredNavigationContainer() {
    const { aggregations } = useSelector((state: RootState) => state.products.productsInformation);

    const router = useRouter();

    const onSelect = (code:string, value: string | number) => {
        setFilterAttribute(router, { code, value });
    };

    const isSelected = (code:string, value: string | number) => getIsFilterSelected(router, { code, value });

    const containerProps = {
        aggregations,
        isSelected,
        onSelect
    };

    return (
        <LayeredNavigationComponent { ...containerProps } />
    );
}

export default LayeredNavigationContainer;
