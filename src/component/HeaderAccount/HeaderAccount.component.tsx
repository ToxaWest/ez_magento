import Link from '@component/Link';
import MyAccountSignIn from '@component/MyAccountSignIn';
import Popup from '@component/Popup';
import { popupId } from '@component/Popup/Popup.config';
import {
    ACCOUNT_ROUTE_PATHNAME,
    DEFAULT_ACCOUNT_TAB,
    urlWithAccount,
    WISHLIST
} from '@route/AccountPage/AccountPage.config';
import { AppDispatch, RootState } from '@store/index';
import { hidePopup, showPopup } from '@store/popup';
import Button from '@ui/Button';
import Icon from '@ui/Icon';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function HeaderAccountComponent() {
    const dispatch = useDispatch<AppDispatch>();

    const { customer: { firstname, wishlist: { items_count } }, isSignedIn } = useSelector(
        (state: RootState) => state.account
    );
    const { magento_wishlist_general_is_enabled } = useSelector((state: RootState) => state.config.config);

    const router = useRouter();
    useEffect(() => {
        if (isSignedIn) {
            dispatch(hidePopup());
        }
    }, [isSignedIn]);

    const onClick = async () => {
        if (isSignedIn) {
            await router.push({
                pathname: ACCOUNT_ROUTE_PATHNAME,
                query: {
                    tab: DEFAULT_ACCOUNT_TAB
                }
            });

            return;
        }
        dispatch(showPopup(popupId.ACCOUNT));
    };

    const renderWishListButton = () => {
        if (!(magento_wishlist_general_is_enabled === '1')) {
            return null;
        }

        return (
            <Link title="wishlist" href={ urlWithAccount(WISHLIST) }>
                <Icon name="favorites" />
                { `${items_count}` }
            </Link>
        );
    };

    return (
        <div>
            <Button onClick={ onClick } title={ firstname }>
                <Icon name="person" />
            </Button>
            { renderWishListButton() }
            <Popup id={ popupId.ACCOUNT }>
                <MyAccountSignIn />
            </Popup>
        </div>
    );
}

export default HeaderAccountComponent;
