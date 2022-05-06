import MyAccountOrders from '@component/MyAccountOrders';
import MyAccountWishlist from '@component/MyAccountWishlist';
import AccountPageComponent from '@route/AccountPage/AccountPage.component';
import {
    ACCOUNT_ROUTE_PATHNAME,
    DASHBOARD,
    DEFAULT_ACCOUNT_TAB,
    ORDER_LIST, WISHLIST
} from '@route/AccountPage/AccountPage.config';
import { RootState } from '@store/index';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function AccountPageContainer() {
    const router: NextRouter = useRouter();
    const { query: { tab } } = router as { query: { tab?: string } };
    const { isSignedIn, loading } = useSelector((state: RootState) => state.account);
    const tabMap = {
        [DASHBOARD]: {
            label: 'Dashboard',
            icon: 'person',
            render: 'div'
        },
        [ORDER_LIST]: {
            label: 'Orders',
            icon: 'list_alt',
            render: MyAccountOrders
        },
        [WISHLIST]: {
            label: 'Wish List',
            icon: 'favorite',
            render: MyAccountWishlist
        }
    };

    useEffect(() => {
        if (!loading) {
            if (!isSignedIn) {
                router.push('/').then(() => {}).catch(() => {});
            }
        }
    }, [loading]);

    useEffect(() => {
        if (!tabMap[tab]) {
            if (tab === DEFAULT_ACCOUNT_TAB) {
                throw new Error('Please add component for default account tab');
            }
            router.push({
                pathname: ACCOUNT_ROUTE_PATHNAME,
                query: {
                    tab: DEFAULT_ACCOUNT_TAB
                }
            }).then(() => {}).catch(() => {});
        }
    }, [tab]);

    const containerProps = {
        loading,
        tab,
        tabMap
    };

    return <AccountPageComponent { ...containerProps } />;
}

export default AccountPageContainer;
