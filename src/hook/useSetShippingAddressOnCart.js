import { useLazyQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useGetCartId from 'Hook/useGetCartId';
import CheckoutQuery from 'Query/checkout.query';
import ConfigQuery from 'Query/config.query';
import { updateCart } from 'Store/cart.store';
import { setErrorNotification } from 'Store/notifiactions';
import { setAddressesInFormObject } from 'Util/Address';
import { getErrorMessage } from 'Util/Request';

const useSetShippingAddressOnCart = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const cartId = useGetCartId();
    const [loadRegions] = useLazyQuery(ConfigQuery.country);
    const [mutateFunction] = useMutation(CheckoutQuery.setShippingAddressesOnCart);
    const { address_lines_quantity, region_display_all } = useSelector((state) => state.config.config);
    return [async (shippingAddress) => {
        const address = setAddressesInFormObject(shippingAddress, address_lines_quantity);
        const {
            country_code, region, region_id, ...otherAddress
        } = address;
        const finalAddress = {
            ...otherAddress,
            country_code
        };

        try {
            setLoading(true);
            const { data: { country: { available_regions, is_state_required } } } = await loadRegions(
                { variables: { id: country_code } }
            );

            if (!region_display_all && !is_state_required) {
                // region not required
            } else if ((!available_regions || !available_regions.length) && region) {
                finalAddress.region = region;
            } else if (region_id) {
                finalAddress.region_id = region_id;
            }
            const cart_id = await cartId();
            const { data: { setShippingAddressesOnCart: { cart } } } = await mutateFunction({
                variables: { input: { cart_id, shipping_addresses: [{ address: finalAddress }] } }
            });

            setLoading(false);
            dispatch(updateCart(cart));
            return true;
        } catch (e) {
            setLoading(false);
            dispatch(setErrorNotification(getErrorMessage(e)));
            return false;
        }
    }, loading];
};

export default useSetShippingAddressOnCart;
