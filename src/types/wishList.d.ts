declare interface WishListItem {
    added_at: string,
    id: number,
    product: ProductInterface,
    quantity: number
}

declare interface WishListInfo {
    items_count: number,
    sharing_code: string
}

declare interface WishListPageInfo {
    page_info: {
        page_size: number
        total_pages: number
    }
}

declare interface AssignedWishListPageInfo extends WishListInfo {
    items_v2: WishListPageInfo
}
