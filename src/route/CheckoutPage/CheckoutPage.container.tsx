import CheckoutBilling from '@component/CheckoutBilling';
import CheckoutPaymentMethods from '@component/CheckoutPaymentMethods';
import CheckoutShipping from '@component/CheckoutShipping';
import CheckoutShippingMethods from '@component/CheckoutShippingMethods';
import { popupId } from '@component/Popup/Popup.config';
import {
    BILLING, CHECKOUT_ROUTE_PATHNAME, DELIVERY, PAYMENT, SHIPPING
} from '@route/CheckoutPage/CheckoutPage.config';
import { AppDispatch, RootState } from '@store/index';
import { updateMeta } from '@store/meta.store';
import { setErrorNotification, setInfoNotification } from '@store/notifiactions';
import { showPopup } from '@store/popup';
import { NextRouter, useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutPageComponent from './CheckoutPage.component';

function CheckoutPageContainer(): ReactElement {
    const {
        account: { isSignedIn, loading: accountLoading }, cart: { isVirtual, items }, guest_checkout, loading
    } = useSelector(({
        account,
        cart: { cart, loading: cartLoading },
        config: { config: { guest_checkout: guestCheckout } }
    }: RootState) => ({
        cart,
        account,
        guest_checkout: guestCheckout,
        loading: cartLoading
    }));

    const router: NextRouter = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { query: { tab } } = router as { query: { tab?:string } };
    const tabMap = {
        [SHIPPING]: {
            label: 'Shipping address',
            include_in_menu: !isVirtual,
            render: CheckoutShipping
        },
        [DELIVERY]: {
            label: 'Delivery method',
            include_in_menu: !isVirtual,
            render: CheckoutShippingMethods
        },
        [BILLING]: {
            label: 'Billing address',
            include_in_menu: true,
            render: CheckoutBilling
        },
        [PAYMENT]: {
            label: 'Payment method',
            include_in_menu: true,
            render: CheckoutPaymentMethods
        }
    };

    useEffect(() => {
        if (tabMap[tab]) {
            const { label: title } = tabMap[tab];
            dispatch(updateMeta({ title }));
        }
    }, [tab]);

    useEffect(() => {
        if (!loading) {
            // if no items, redirect to cart
            if (items.length === 0) {
                router.push('/cart').then(
                    () => dispatch(setErrorNotification('Cart is empty!'))
                ).catch(() => {});
            }
            // if guest checkout not enabled, redirect to cart and show login popup
            if (!guest_checkout && !accountLoading) {
                if (!isSignedIn) {
                    router.push('/cart').then(() => {
                        dispatch(showPopup(popupId.ACCOUNT));
                        dispatch(setInfoNotification('Guest checkout not allowed'));
                    }).catch(() => {

                    });
                }
                // if cart is virtual, redirect to billing
            } else if (isVirtual) {
                router.push({
                    pathname: CHECKOUT_ROUTE_PATHNAME,
                    query: {
                        tab: BILLING
                    }
                }).catch(() => {});
            } else if (!tabMap[tab]) {
                router.push('/cart').then(
                    () => dispatch(setErrorNotification('Route not exist'))
                ).catch(() => {});
            }
        }
    }, [loading, accountLoading]);

    const onClick = (tabName: string): void => {
        router.push({
            pathname: CHECKOUT_ROUTE_PATHNAME,
            query: {
                tab: tabName
            }
        }).then(() => {}).catch(() => {});
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
}

export default CheckoutPageContainer;
