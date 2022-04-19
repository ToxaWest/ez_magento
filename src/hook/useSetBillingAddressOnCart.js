import { useLazyQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useGetCartId from 'Hook/useGetCartId';
import CheckoutQuery from 'Query/checkout.query';
import ConfigQuery from 'Query/config.query';
import { updateCart } from 'Store/cart.store';
import { setErrorNotification } from 'Store/notifiactions';
import { _normalizeAddressAsMagentoStyle, setAddressesInFormObject } from 'Util/Address';
import { getErrorMessage } from 'Util/Request';

const useSetBillingAddressOnCart = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const cartId = useGetCartId();
    const [loadRegions] = useLazyQuery(ConfigQuery.country);
    const [mutateFunction] = useMutation(CheckoutQuery.setBillingAddressOnCart);
    const { address_lines_quantity, region_display_all } = useSelector((state) => state.config.config);
    const { shipping_addresses } = useSelector((state) => state.cart.cart);
    return [
        async (billingAddress) => {
            setLoading(true);
            const addressToFix = billingAddress.same_as_shipping
                ? _normalizeAddressAsMagentoStyle(shipping_addresses[0])
                : billingAddress;

            const address = setAddressesInFormObject(addressToFix, address_lines_quantity);
            const {
                country_code, region, region_id, same_as_shipping, ...otherAddress
            } = address;
            const finalAddress = {
                ...otherAddress,
                country_code
            };

            if (!country_code) {
                setLoading(false);
                dispatch(setErrorNotification('Country is required'));
                return false;
            }

            try {
                const cart_id = await cartId();
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

                const { data: { setBillingAddressOnCart: { cart } } } = await mutateFunction({
                    variables: { input: { cart_id, billing_address: { address: finalAddress, same_as_shipping } } }
                });

                setLoading(false);
                dispatch(updateCart(cart));
                return true;
            } catch (e) {
                dispatch(setErrorNotification(getErrorMessage(e)));
                return false;
            }
        }, loading
    ];
};

export default useSetBillingAddressOnCart;