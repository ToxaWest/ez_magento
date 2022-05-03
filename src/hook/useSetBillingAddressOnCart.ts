import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';
import useGetCartId from '@hook/useGetCartId';
import { countryInterface } from '@hook/useUserAddress';
import CheckoutQuery from '@query/checkout.query';
import ConfigQuery from '@query/config.query';
import { updateCart } from '@store/cart.store';
import { RootState } from '@store/index';
import { setErrorNotification } from '@store/notifiactions';
import { _normalizeAddressAsMagentoStyle, fieldsInterface, setAddressesInFormObject } from '@util/Address';
import { getErrorMessage } from '@util/Request';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useSetBillingAddressOnCart = (): [(values: fieldsInterface) => Promise<boolean>, boolean] => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const cartId = useGetCartId();
    const [loadRegions] = useLazyQuery<{ country: countryInterface }>(ConfigQuery.country);
    const [mutateFunction] = useMutation(CheckoutQuery.setBillingAddressOnCart);
    const { address_lines_quantity, region_display_all } = useSelector((state: RootState) => state.config.config);
    const { shipping_addresses } = useSelector((state: RootState) => state.cart.cart);
    return [
        async (billingAddress: fieldsInterface) => {
            setLoading(true);
            const addressToFix = billingAddress.same_as_shipping
                ? _normalizeAddressAsMagentoStyle(shipping_addresses[0]) as fieldsInterface
                : billingAddress;

            if (!addressToFix) {
                setLoading(false);
                dispatch(setErrorNotification('Address is empty'));
                return false;
            }

            const address = setAddressesInFormObject(addressToFix, address_lines_quantity);
            const {
                country_code, region, region_id, same_as_shipping, ...otherAddress
            } = address;
            const finalAddress = {
                ...otherAddress,
                country_code
            } as fieldsInterface;

            if (!country_code) {
                setLoading(false);
                dispatch(setErrorNotification('Country is required'));
                return false;
            }

            try {
                const cart_id = await cartId();
                const { data: { country: { available_regions, is_state_required } } } = await loadRegions(
                    { variables: { id: country_code } },
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
                dispatch(setErrorNotification(getErrorMessage(e as ApolloError)));
                return false;
            }
        }, loading
    ];
};

export default useSetBillingAddressOnCart;
