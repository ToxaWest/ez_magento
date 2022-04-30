import { ApolloError, useMutation } from '@apollo/client';
import useGetCartId from '@hook/useGetCartId';
import CheckoutQuery from '@query/checkout.query';
import { RootState } from '@store/index';
import { setErrorNotification } from '@store/notifiactions';
import { fieldsInterface, setAddressesInFormObject } from '@util/Address';
import { getErrorMessage } from '@util/Request';
import { useDispatch, useSelector } from 'react-redux';

const useEstimateShippingCosts = ():(v: fieldsInterface)=> Promise<object[]> => {
    const cartId = useGetCartId();
    const dispatch = useDispatch();
    const [mutateFunction] = useMutation(CheckoutQuery.estimateShippingCosts);
    const { address_lines_quantity } = useSelector((state: RootState) => state.config.config);

    return async (shippingAddress) => {
        const guestCartId = await cartId();

        const {
            country_code, region_id, region, city, email, customer_id, street, postcode
        } = setAddressesInFormObject(shippingAddress, address_lines_quantity);

        const address = {
            city,
            country_id: country_code,
            customer_id,
            email,
            postcode,
            region,
            region_id,
            street
        };

        try {
            const { data: { estimateShippingCosts } } = await mutateFunction({
                variables: {
                    address,
                    guestCartId
                }
            });

            return estimateShippingCosts as object[];
        } catch (e) {
            dispatch(setErrorNotification(getErrorMessage(e as ApolloError)));
            return [];
        }
    };
};

export default useEstimateShippingCosts;
