import { ApolloError, useLazyQuery } from '@apollo/client';
import useLogout from '@hook/useLogout';
import accountQuery from '@query/account.query';
import { updateCustomer, updateCustomerLoadingStatus } from '@store/account.store';
import { AppDispatch } from '@store/index';
import { setErrorNotification } from '@store/notifiactions';
import { TOKEN_ID } from '@util/Account';
import BrowserDatabase from '@util/BrowserDatabase';
import { getErrorMessage } from '@util/Request';
import { useDispatch } from 'react-redux';

const useGetCustomer = (): () => Promise<boolean> => {
    const [loadGreeting] = useLazyQuery(accountQuery.customer, { ssr: false });
    const dispatch = useDispatch<AppDispatch>();
    const logout = useLogout();

    return async () => {
        const token = BrowserDatabase.getItem(TOKEN_ID) as string;
        if (!token) {
            dispatch(updateCustomerLoadingStatus(false));
            return false;
        }
        try {
            const { data: { customer } } = await loadGreeting();

            if (customer) {
                dispatch(updateCustomer(customer));
            } else {
                await logout();
            }

            return true;
        } catch (e) {
            dispatch(setErrorNotification(getErrorMessage(e as ApolloError)));
            return false;
        }
    };
};

export default useGetCustomer;
