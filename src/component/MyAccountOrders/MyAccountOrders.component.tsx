import useCustomerOrders from '@hook/useCustomerOrders';
import { RootState } from '@store/index';
import Loader from '@ui/Loader';
import { getFinalPrice } from '@util/Price/price';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

function MyAccountOrdersComponent(): ReactElement {
    const { customerOrders: { items, total_count }, loading } = useCustomerOrders();
    const locale = useSelector((state: RootState) => state.config.config.locale.replace('_', '-'));

    if (!loading && total_count === 0) {
        return <span>No items</span>;
    }

    const renderThead = () => (
            <thead>
                <tr>
                    <td>Status</td>
                    <td>date</td>
                    <td>total</td>
                </tr>
            </thead>
    );

    const renderTbody = () => (
        <tbody>
            { items.map(({
                order_date, id, status, total
            }) => (
                <tr key={ id }>
                    <td>{ status }</td>
                    <td>{ order_date }</td>
                    <td>{ getFinalPrice(total.grand_total, locale) }</td>
                </tr>
            )) }
        </tbody>
    );

    return (
        <div>
            <Loader isLoading={ loading } />
            <table>
                { renderThead() }
                { renderTbody() }
            </table>
        </div>
    );
}

export default MyAccountOrdersComponent;
