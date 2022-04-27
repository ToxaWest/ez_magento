import { useMutation } from '@apollo/client';
import useGetCartId from '@hook/useGetCartId';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutQuery from 'Query/checkout.query';
import { setErrorNotification } from 'Store/notifiactions';
import { setAddressesInFormObject } from 'Util/Address';
import { getErrorMessage } from 'Util/Request';

const useEstimateShippingCosts = () => {
    const cartId = useGetCartId();
    const dispatch = useDispatch();
    const [mutateFunction] = useMutation(CheckoutQuery.estimateShippingCosts);
    const { address_lines_quantity } = useSelector((state) => state.config.config);

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

            return estimateShippingCosts;
        } catch (e) {
            dispatch(setErrorNotification(getErrorMessage(e)));
            return [];
        }
    };
};

export default useEstimateShippingCosts;
