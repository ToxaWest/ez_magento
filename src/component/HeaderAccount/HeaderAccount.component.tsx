import MyAccountSignIn from '@component/MyAccountSignIn';
import Popup from '@component/Popup';
import { popupId } from '@component/Popup/Popup.config';
import { ACCOUNT_ROUTE_PATHNAME, DEFAULT_ACCOUNT_TAB } from '@route/AccountPage/AccountPage.config';
import { AppDispatch, RootState } from '@store/index';
import { hidePopup, showPopup } from '@store/popup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function HeaderAccountComponent() {
    const dispatch = useDispatch<AppDispatch>();

    const { customer: { firstname }, isSignedIn } = useSelector((state: RootState) => state.account);

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

    const getTitle = () => {
        if (isSignedIn) {
            return `Hi ${firstname}`;
        }

        return 'Sign In';
    };

    return (
        <div>
            <button onClick={ onClick }>{ getTitle() }</button>
            <Popup id={ popupId.ACCOUNT }>
                <MyAccountSignIn />
            </Popup>
        </div>
    );
}

export default HeaderAccountComponent;