import {
    ApolloQueryResult, gql, useLazyQuery, useMutation
} from '@apollo/client';
import { addProductsToWishlist, price_range, priceFragment } from '@gql/index';
import removeProductsFromWishlist from '@gql/mutation/removeProductsFromWishlist.graphql';
import wishListInformation from '@gql/query/wishListInformation.graphql';
import wishListItems from '@gql/query/wishListItems.graphql';
import { updateWishListItemsCount } from '@store/account.store';
import { RootState } from '@store/index';
import { setInfoNotification, setSuccessNotification } from '@store/notifiactions';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useWishList = ({ getWishList }: { getWishList: boolean } = { getWishList: false }) => {
    const { isSignedIn, customer: { wishlist: { id } } } = useSelector((state: RootState) => state.account);

    const dispatch = useDispatch();
    const router: NextRouter = useRouter();
    const { query: { page = '1' } } = router;
    const [loading, setLoading] = useState<boolean>(false);
    const [pageInfo, setPageInfo] = useState<(WishListInfo & WishListPageInfo)>({
        sharing_code: '',
        items_count: 0,
        page_info: {
            page_size: 0,
            total_pages: 0
        }
    });
    const [items, setItems] = useState<WishListItem[]>([]);
    const [addItem] = useMutation(gql`${addProductsToWishlist}`);
    const [removeItem] = useMutation(gql`${removeProductsFromWishlist}`);
    const [loadPageInfo] = useLazyQuery(gql`${wishListInformation}`);
    const [loadItems] = useLazyQuery(gql`
        ${priceFragment}
        ${price_range}
        ${wishListItems}
    `);

    const getWishListItems = async (p: string, noCache = false) => {
        setLoading(true);
        const { data: { customer: { wishlist_v2: { items_v2: { items: res } } } } }: ApolloQueryResult<{
            customer: { wishlist_v2: { items_v2: { items: WishListItem[] } } }
        }> = await loadItems({
            variables: { id, page: p || 1 },
            ...(noCache ? {
                fetchPolicy: 'network-only'
            } : {})
        });

        setLoading(false);

        return res;
    };

    const getWishListPageInfo = async (noCache = false) => {
        const { data: { customer: { wishlist_v2 } } }: ApolloQueryResult<{
            customer: { wishlist_v2: AssignedWishListPageInfo }
        }> = await loadPageInfo({
            variables: { id },
            ...(noCache ? {
                fetchPolicy: 'network-only'
            } : {})
        });
        const { items_v2, ...info } = wishlist_v2;

        return { ...items_v2, ...info };
    };

    const addToWishList = ({ sku }: { sku: string }) => {
        if (!isSignedIn) {
            dispatch(setInfoNotification('Please sign in to add product to wish list'));
            return;
        }
        setLoading(true);
        addItem({
            variables: { id, wishlistItems: [{ sku, quantity: 1 }] }
        }).then(({ data: { addProductsToWishlist: { wishlist: { items_count } } } }: ApolloQueryResult<{
         addProductsToWishlist: { wishlist: { items_count: number } }
        }>) => {
            dispatch(updateWishListItemsCount(items_count));
            dispatch(setSuccessNotification('Product Added to WishList'));
            setLoading(false);
            if (getWishList) {
                getWishListPageInfo(true).then(setPageInfo).catch(() => {});
                getWishListItems(page as string, true).then(setItems).catch(() => {});
            }
        }).catch(() => {});
    };

    const removeFromWishList = ({ id: item_id }: { id: string | number }) => {
        setLoading(true);
        removeItem({
            variables: { id, wishlistItemsIds: [item_id] }
        }).then(({ data: { removeProductsFromWishlist: { wishlist: { items_count } } } }: ApolloQueryResult<{
            removeProductsFromWishlist: { wishlist: { items_count: number } }
        }>) => {
            dispatch(updateWishListItemsCount(items_count));
            dispatch(setSuccessNotification('Product removed from WishList'));
            setLoading(false);
            if (getWishList) {
                getWishListPageInfo(true).then(setPageInfo).catch(() => {});
                getWishListItems(page as string, true).then(setItems).catch(() => {});
            }
        }).catch(() => {});
    };

    useEffect(() => {
        if (getWishList) {
            getWishListPageInfo().then(setPageInfo).catch(() => {});
            getWishListItems(page as string).then(setItems).catch(() => {});
        }
    }, []);

    useEffect(() => {
        if (getWishList) {
            getWishListItems(page as string).then(setItems).catch(() => {});
        }
    }, [page]);

    return {
        getWishListPageInfo,
        getWishListItems,
        removeFromWishList,
        addToWishList,
        loading,
        pageInfo,
        items,
        disabled: !isSignedIn || loading
    };
};

export default useWishList;
