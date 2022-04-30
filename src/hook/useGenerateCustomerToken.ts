import { ApolloError, useMutation } from '@apollo/client';
import useGetCustomer from '@hook/useGetCustomer';
import useMergeCarts from '@hook/useMergeCarts';
import accountQuery from '@query/account.query';
import { AppDispatch } from '@store/index';
import { setErrorNotification } from '@store/notifiactions';
import { TOKEN_ID } from '@util/Account';
import { fieldsInterface } from '@util/Address';
import BrowserDatabase from '@util/BrowserDatabase';
import { getErrorMessage } from '@util/Request';
import { useDispatch } from 'react-redux';

const useGenerateCustomerToken = (): (variables: fieldsInterface) => Promise<boolean> => {
    const [mutateFunction] = useMutation(accountQuery.generateCustomerToken);
    const getCustomerData = useGetCustomer();
    const updateCart = useMergeCarts();
    const dispatch = useDispatch<AppDispatch>();
    return async (variables) => {
        try {
            const { data: { generateCustomerToken: { token } } } = await mutateFunction({ variables });
            BrowserDatabase.setItem(token, TOKEN_ID, null);
            await getCustomerData();
            await updateCart();
            return true;
        } catch (e) {
            dispatch(setErrorNotification(getErrorMessage(e as ApolloError)));
            return false;
        }
    };
};

export default useGenerateCustomerToken;
