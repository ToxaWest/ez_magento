import {
    ApolloQueryResult, gql, useLazyQuery, useMutation
} from '@apollo/client';
import { addProductsToWishlist, price_range, priceFragment } from '@graphql/index';
import removeProductsFromWishlist from '@graphql/mutation/removeProductsFromWishlist.graphql';
import wishListInformation from '@graphql/query/wishListInformation.graphql';
import wishListItems from '@graphql/query/wishListItems.graphql';
import { updateWishListItemsCount } from '@store/account.store';
import { AppDispatch, RootState } from '@store/index';
import { setInfoNotification, setSuccessNotification } from '@store/notifiactions';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface useWishListReturn {
    addToWishList: ({ sku }: { sku: string }) => void,
    disabled:boolean,
    getWishListItems: (p: string, noCache: boolean) => Promise<WishListItem[]>,
    getWishListPageInfo: (noCache: boolean) => Promise<(WishListInfo & WishListPageInfo)>,
    items: WishListItem[],
    loading: boolean,
    pageInfo: WishListInfo & WishListPageInfo,
    removeFromWishList: ({ id } : { id: string | number }) => void
}

const useWishList = ({ getWishList }: { getWishList: boolean } = { getWishList: false }): useWishListReturn => {
    const { customer: { wishlist: { id } }, isSignedIn } = useSelector((state: RootState) => state.account);

    const dispatch = useDispatch<AppDispatch>();
    const router: NextRouter = useRouter();
    const { query: { page = '1' } } = router;
    const [loading, setLoading] = useState<boolean>(false);
    const [pageInfo, setPageInfo] = useState<(WishListInfo & WishListPageInfo)>({
        sharing_code: '',
        items_count: 0,
        page_info: { page_size: 0, total_pages: 0 }
    });
    const [items, setItems] = useState<WishListItem[]>([]);
    const [addItem] = useMutation(addProductsToWishlist);
    const [removeItem] = useMutation(removeProductsFromWishlist);
    const [loadPageInfo] = useLazyQuery(wishListInformation);
    const [loadItems] = useLazyQuery(gql`
        ${priceFragment}
        ${price_range}
        ${wishListItems}
    `);

    const getWishListItems = async (p: string, noCache = false): Promise<WishListItem[]> => {
        setLoading(true);
        const { data: { customer: { wishlist_v2: { items_v2: { items: res } } } } }: ApolloQueryResult<{
            customer: { wishlist_v2: { items_v2: { items: WishListItem[] } } }
        }> = await loadItems({
            variables: { id, page: p || 1 },
            ...(noCache ? { fetchPolicy: 'network-only' } : {})
        });

        setLoading(false);

        return res;
    };

    const getWishListPageInfo = async (noCache = false): Promise<(WishListInfo & WishListPageInfo)> => {
        const { data: { customer: { wishlist_v2 } } }: ApolloQueryResult<{
            customer: { wishlist_v2: AssignedWishListPageInfo }
        }> = await loadPageInfo({
            variables: { id },
            ...(noCache ? { fetchPolicy: 'network-only' } : {})
        });
        const { items_v2, ...info } = wishlist_v2;

        return { ...items_v2, ...info };
    };

    const addToWishList = ({ sku }: { sku: string }): void => {
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

    const removeFromWishList = ({ id: item_id }: { id: string | number }): void => {
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
            getWishListPageInfo(true).then(setPageInfo).catch(() => {});
            getWishListItems(page as string, true).then(setItems).catch(() => {});
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
