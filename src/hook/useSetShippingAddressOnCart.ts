import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';
import useGetCartId from '@hook/useGetCartId';
import { countryInterface } from '@hook/useUserAddress';
import CheckoutQuery from '@query/checkout.query';
import ConfigQuery from '@query/config.query';
import { updateCart } from '@store/cart.store';
import { RootState } from '@store/index';
import { setErrorNotification } from '@store/notifiactions';
import { fieldsInterface, setAddressesInFormObject } from '@util/Address';
import { getErrorMessage } from '@util/Request';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useSetShippingAddressOnCart = (): [(values: fieldsInterface) => Promise<boolean>, boolean] => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const cartId = useGetCartId();
    const [loadRegions] = useLazyQuery<{ country: countryInterface }>(ConfigQuery.country);
    const [mutateFunction] = useMutation(CheckoutQuery.setShippingAddressesOnCart);
    const { address_lines_quantity, region_display_all } = useSelector((state: RootState) => state.config.config);
    return [async (shippingAddress: fieldsInterface) => {
        const address = setAddressesInFormObject(shippingAddress, address_lines_quantity);
        const {
            country_code, region, region_id, ...otherAddress
        } = address;
        const finalAddress = {
            ...otherAddress,
            country_code
        } as fieldsInterface;

        try {
            setLoading(true);
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
            const cart_id = await cartId();
            const { data: { setShippingAddressesOnCart: { cart } } } = await mutateFunction({
                variables: { input: { cart_id, shipping_addresses: [{ address: finalAddress }] } }
            });

            setLoading(false);
            dispatch(updateCart(cart));
            return true;
        } catch (e) {
            setLoading(false);
            dispatch(setErrorNotification(getErrorMessage(e as ApolloError)));
            return false;
        }
    }, loading];
};

export default useSetShippingAddressOnCart;
