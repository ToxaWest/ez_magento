import useGetCustomer from '@hook/useGetCustomer';
import useUpdateInitialCart from '@hook/useUpdateInitialCart';
import { makeCancelable } from '@util/Request';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useInit = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const update = useUpdateInitialCart();
    const getCustomerData = useGetCustomer();
    const history = [];

    useEffect(() => {
        const handleRouteChangeStart = (r: NextRouter['asPath']) => {
            global.prevPath = history[history.length - 1];
            history.push(r.split('?')[0]);
            setLoading(true);
        };

        const handleRouteChangeComplete = () => setLoading(false);

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        const { cancel, promise } = makeCancelable(Promise.all([
            update(),
            getCustomerData()
        ]));

        promise.then(() => {
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            cancel();
        };
    }, []);

    return [loading];
};

export default useInit;
