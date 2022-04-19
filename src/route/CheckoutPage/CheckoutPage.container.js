import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutBilling from 'Component/CheckoutBilling';
import CheckoutPaymentMethods from 'Component/CheckoutPaymentMethods';
import CheckoutShipping from 'Component/CheckoutShipping';
import CheckoutShippingMethods from 'Component/CheckoutShippingMethods';
import { popupId } from 'Component/Popup/Popup.config';
import {
    BILLING, CHECKOUT_ROUTE_PATHNAME, DELIVERY, PAYMENT, SHIPPING
} from 'Route/CheckoutPage/CheckoutPage.config';
import { setErrorNotification, setInfoNotification } from 'Store/notifiactions';
import { showPopup } from 'Store/popup';

import CheckoutPageComponent from './CheckoutPage.component';

const CheckoutPageContainer = () => {
    const {
        cart: { items, isVirtual }, loading, accountLoading, isSignedIn, guest_checkout
    } = useSelector(({
        cart: { cart, loading },
        account: { isSignedIn, loading: accountLoading },
        config: { config: { guest_checkout } }
    }) => ({
        accountLoading, cart, guest_checkout, isSignedIn, loading
    }));

    const router = useRouter();
    const dispatch = useDispatch();
    const { query: { tab } } = router;
    const tabMap = {
        [SHIPPING]: {
            label: 'shipping',
            include_in_menu: !isVirtual,
            render: CheckoutShipping
        },
        [DELIVERY]: {
            label: 'delivery',
            include_in_menu: !isVirtual,
            render: CheckoutShippingMethods
        },
        [BILLING]: {
            label: 'billing',
            include_in_menu: true,
            render: CheckoutBilling
        },
        [PAYMENT]: {
            label: 'payment',
            include_in_menu: true,
            render: CheckoutPaymentMethods
        }
    };

    useEffect(() => {
        if (!loading) {
            // if no items, redirect to cart
            if (items.length === 0) {
                router.push('/cart').then(() => dispatch(setErrorNotification('Cart is empty!')));
            }
            // if guest checkout not enabled, redirect to cart and show login popup
            if (!guest_checkout && !accountLoading) {
                if (!isSignedIn) {
                    router.push('/cart').then(() => {
                        dispatch(showPopup(popupId.ACCOUNT));
                        dispatch(setInfoNotification('Guest checkout not allowed'));
                    });
                }
            // if cart is virtual, redirect to billing
            } else if (isVirtual) {
                router.push({
                    pathname: CHECKOUT_ROUTE_PATHNAME,
                    query: {
                        tab: BILLING
                    }
                });
            } else if (!tabMap[tab]) {
                router.push('/cart').then(() => dispatch(setErrorNotification('Route not exist')));
            }
        }
    }, [loading, accountLoading]);

    const onClick = (tab) => {
        router.push({
            pathname: CHECKOUT_ROUTE_PATHNAME,
            query: {
                tab
            }
        });
    };

    const containerProps = {
        tabMap,
        onClick,
        tab
    };

    return (
        <CheckoutPageComponent
          { ...containerProps }
        />
    );
};

export default CheckoutPageContainer;
