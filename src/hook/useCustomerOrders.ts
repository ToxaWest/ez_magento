import { useLazyQuery } from '@apollo/client';
import accountQuery from '@query/account.query';
import { RootState } from '@store/index';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface customerOrdersInterface {
    items: {
        id: number,
        order_date: string,
        status: string,
        total: {
            grand_total: {
                currency: string, value: number
            }
        }
    }[],
    total_count: number
}

const useCustomerOrders = (): { customerOrders: customerOrdersInterface, loading: boolean } => {
    const [loadGreeting] = useLazyQuery<{
        customer: { orders: customerOrdersInterface }
    }>(accountQuery.customerOrders, { ssr: false });
    const { isSignedIn } = useSelector((state: RootState) => state.account);
    const [customerOrders, setData] = useState<customerOrdersInterface>({
        items: [],
        total_count: 0
    });
    const [loading, setLoading] = useState<boolean>(true);
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
