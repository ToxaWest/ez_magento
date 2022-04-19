import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import MyAccountOrders from 'Component/MyAccountOrders';
import AccountPageComponent from 'Route/AccountPage/AccountPage.component';
import {
    ACCOUNT_ROUTE_PATHNAME,
    DASHBOARD,
    DEFAULT_ACCOUNT_TAB,
    ORDER_LIST
} from 'Route/AccountPage/AccountPage.config';

const AccountPageContainer = () => {
    const router = useRouter();
    const { query: { tab } } = router;
    const { isSignedIn, loading } = useSelector((state) => state.account);
    const tabMap = {
        [DASHBOARD]: {
            label: 'Dashboard',
            render: 'div'
        },
        [ORDER_LIST]: {
            label: 'Orders',
            render: MyAccountOrders
        }
    };

    useEffect(() => {
        if (!loading) {
            if (!isSignedIn) {
                router.push('/');
            }
        }
    }, [loading]);

    useEffect(() => {
        if (!tabMap[tab]) {
            if (tab === DEFAULT_ACCOUNT_TAB) {
                throw new Error('Please add component for default account tab');
            }
            // eslint-disable-next-line no-console
            console.log(`${tab} - not specified, redirect to default account tab`);
            router.push({
                pathname: ACCOUNT_ROUTE_PATHNAME,
                query: {
                    tab: DEFAULT_ACCOUNT_TAB
                }
            });
        }
    }, [tab]);

    const containerProps = {
        loading,
        tab,
        tabMap
    };

    return <AccountPageComponent { ...containerProps } />;
};

export default AccountPageContainer;
