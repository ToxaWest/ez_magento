declare interface WishListItem {
    id: number
    quantity: number
    added_at: string
    product: ProductInterface
}

declare interface WishListInfo {
    sharing_code: string
    items_count: number
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
