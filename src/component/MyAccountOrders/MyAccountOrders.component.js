import { useSelector } from 'react-redux';

import Loader from 'Component/Loader';
import useCustomerOrders from 'Hook/useCustomerOrders';
import { getFinalPrice } from 'Util/Price/price';

const MyAccountOrdersComponent = () => {
    const { customerOrders: { items, total_count }, loading } = useCustomerOrders();
    const locale = useSelector((state) => state.config.config.locale.replace('_', '-'));

    if (!loading && total_count === 0) {
        return 'No items';
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
};

export default MyAccountOrdersComponent;
