import { useMutation } from '@apollo/client';
import useGetCustomer from '@hook/useGetCustomer';
import useMergeCarts from '@hook/useMergeCarts';
import { useDispatch } from 'react-redux';

import { TOKEN_ID } from 'Dispatcher/myAccount.dispatcher';
import accountQuery from 'Query/account.query';
import { setErrorNotification } from 'Store/notifiactions';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getErrorMessage } from 'Util/Request';

const useGenerateCustomerToken = () => {
    const [mutateFunction] = useMutation(accountQuery.generateCustomerToken);
    const getCustomerData = useGetCustomer();
    const updateCart = useMergeCarts();
    const dispatch = useDispatch();
    return async (variables) => {
        try {
            const { data: { generateCustomerToken: { token } } } = await mutateFunction({ variables });
            BrowserDatabase.setItem(token, TOKEN_ID, null);
            await getCustomerData();
            await updateCart();
            return true;
        } catch (e) {
            dispatch(setErrorNotification(getErrorMessage(e)));
            return false;
        }
    };
};

export default useGenerateCustomerToken;
