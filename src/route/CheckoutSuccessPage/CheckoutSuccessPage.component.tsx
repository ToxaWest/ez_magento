import { ORDER_DATA } from '@route/CheckoutPage/CheckoutPage.config';
import Loader from '@ui/Loader';
import BrowserDatabase from '@util/BrowserDatabase';
import { useEffect, useState } from 'react';

function CheckoutSuccessPageComponent() {
    const [order, setOrder] = useState<{ order_number: number | string }>(null);

    useEffect(() => {
        const orderObj = BrowserDatabase.getItem(ORDER_DATA) as { order_number: number | string };
        setOrder(orderObj);
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
