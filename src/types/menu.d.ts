declare interface CategoryMenuInitial {
    children: CategoryMenuInitial[],
    include_in_menu: number,
    item_id: number,
    position?: number,
    title: string,
    url: string
}

declare interface MenuChildItems {
    [key: string]:MenuItem
}

declare interface MenuItem extends CategoryMenuInitial {
    children: MenuChildItems,
    item_id: string,
    parent_id: number
}
