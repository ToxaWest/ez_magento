import { useLazyQuery } from '@apollo/client';
import accountQuery from '@query/account.query';
import { RootState } from '@store/index';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface customerOrdersInterface {
    items: {
        order_date: string,
        id: number,
        status: string,
        total: {
            grand_total: {
                value: number, currency: string
            }
        }
    }[],
    total_count: number
}

const useCustomerOrders = () => {
    const [loadGreeting] = useLazyQuery<{
        customer: { orders: customerOrdersInterface }
    }>(accountQuery.customerOrders, { ssr: false });
    const { isSignedIn } = useSelector((state: RootState) => state.account);
    const [customerOrders, setData] = useState<customerOrdersInterface>({
        items: [],
        total_count: 0
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (isSignedIn) {
            loadGreeting()
                .then(({ data: { customer: { orders } } }) => {
                    setData(orders);
                    setLoading(false);
                })
                .catch(() => {
                });
        }
    }, [isSignedIn]);

    return {
        customerOrders,
        loading
    };
};

export default useCustomerOrders;
