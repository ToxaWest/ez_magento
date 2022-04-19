import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import accountQuery from 'Query/account.query';

const useCustomerOrders = () => {
    const [loadGreeting] = useLazyQuery(accountQuery.customerOrders);
    const { isSignedIn } = useSelector((state) => state.account);
    const [customerOrders, setData] = useState({ items: [], total_count: 0 });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (isSignedIn) {
            loadGreeting().then(({ data: { customer: { orders } } }) => {
                setData(orders);
                setLoading(false);
            });
        }
    }, [isSignedIn]);

    return { customerOrders, loading };
};

export default useCustomerOrders;
