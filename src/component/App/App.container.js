import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AppComponent from 'Component/App/App.component';
import useGetCustomer from 'Hook/useGetCustomer';
import useUpdateInitialCart from 'Hook/useUpdateInitialCart';
import { makeCancelable } from 'Util/Request';

const AppContainer = (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const update = useUpdateInitialCart();
    const getCustomerData = useGetCustomer();
    const history = [];

    useEffect(() => {
        const handleRouteChangeStart = (r) => {
            window.prevPath = history[history.length - 1];
            history.push(r.split('?')[0]);
            setLoading(true);
        };

        const handleRouteChangeComplete = () => setLoading(false);

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        const { promise, cancel } = makeCancelable(Promise.all([
            update(),
            getCustomerData()
        ]));

        promise.then(() => {
            setLoading(false);
        });

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            cancel();
        };
    }, []);

    return (
      <AppComponent { ...props } loading={ loading } />
    );
};

export default AppContainer;
