/*
 * Copyright (c) 2022. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

import AppComponent from '@component/App/App.component';
import useGetCustomer from '@hook/useGetCustomer';
import useUpdateInitialCart from '@hook/useUpdateInitialCart';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { makeCancelable } from 'Util/Request';

function AppContainer(props) {
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
}

export default AppContainer;
