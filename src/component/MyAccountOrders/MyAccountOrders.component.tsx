import useCustomerOrders from '@hook/useCustomerOrders';
import { RootState } from '@store/index';
import Loader from '@ui/Loader';
import Table from '@ui/Table';
import { getFinalPrice } from '@util/Price/price';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

function MyAccountOrdersComponent(): ReactElement {
    const { customerOrders: { items, total_count }, loading } = useCustomerOrders();
    const locale = useSelector((state: RootState) => state.config.config.locale.replace('_', '-'));

    if (!loading && total_count === 0) {
        return <span>No items</span>;
    }

    const data = items.map((i) => ({
        ...i,
        grand_total: getFinalPrice(i.total.grand_total, locale)
    }));

    return (
        <div>
            <Loader isLoading={ loading } />
            <Table
              data={ data }
              head={ [
                  { key: 'status', label: 'Status' },
                  { key: 'order_date', label: 'Date' },
                  { key: 'grand_total', label: 'Total' }
              ] }
            />
        </div>
    );
}

export default MyAccountOrdersComponent;
