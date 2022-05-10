import { useMutation } from '@apollo/client';
import revokeCustomerToken from '@graphql/mutation/revokeCustomerToken.graphql';
import { logOutCustomer } from '@store/account.store';
import { AppDispatch } from '@store/index';
import { setSuccessNotification } from '@store/notifiactions';
import { TOKEN_ID } from '@util/Account';
import BrowserDatabase from '@util/BrowserDatabase';
import { CART_ID } from '@util/Cart';
import { NextRouter, useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const useLogout = (): () => Promise<void> => {
    const [logoutMutation] = useMutation(revokeCustomerToken);
    const dispatch = useDispatch<AppDispatch>();
    const router: NextRouter = useRouter();
    return async () => {
        const { data: { revokeCustomerToken: { result } } } = await logoutMutation();
        if (result) {
            dispatch(logOutCustomer());
            BrowserDatabase.deleteItem(CART_ID);
            BrowserDatabase.deleteItem(TOKEN_ID);
            router.push('/').then(() => {
                dispatch(setSuccessNotification('You successfully logged out'));
            }).catch(() => {});
        }
    };
};

export default useLogout;
