import Loader from '@component/Loader';
import { useEffect, useState } from 'react';

import { ORDER_DATA } from 'Route/CheckoutPage/CheckoutPage.config';
import BrowserDatabase from 'Util/BrowserDatabase';

function CheckoutSuccessPageComponent() {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        setOrder(BrowserDatabase.getItem(ORDER_DATA));
        return () => {
            BrowserDatabase.deleteItem(ORDER_DATA);
        };
    }, []);

    const renderContent = () => {
        if (!order) {
            return null;
        }
        const { order_number } = order;

        return `#${order_number} is placed`;
    };

    return (
        <div>
            <Loader isLoading={ !order } />
            { renderContent() }
        </div>
    );
}

export default CheckoutSuccessPageComponent;
