import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { TOKEN_ID } from 'Dispatcher/myAccount.dispatcher';
import accountQuery from 'Query/account.query';
import { updateCustomer, updateCustomerLoadingStatus } from 'Store/account.store';
import { setErrorNotification } from 'Store/notifiactions';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getErrorMessage } from 'Util/Request';

const useGetCustomer = () => {
    const [loadGreeting] = useLazyQuery(accountQuery.customer, { ssr: false });
    const dispatch = useDispatch();

    return async () => {
        const token = BrowserDatabase.getItem(TOKEN_ID);
        if (!token) {
            dispatch(updateCustomerLoadingStatus(false));
            return false;
        }
        try {
            const { data: { customer } } = await loadGreeting();

            if (customer) {
                dispatch(updateCustomer(customer));
            } else {
                // need implement logout hook
                BrowserDatabase.deleteItem(TOKEN_ID);
            }

            return true;
        } catch (e) {
            dispatch(setErrorNotification(getErrorMessage(e)));
            return false;
        }
    };
};

export default useGetCustomer;
