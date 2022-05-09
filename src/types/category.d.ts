declare interface BreadcrumbInterface {
    name: string,
    url: string
}

declare interface CategoryBreadcrumbsInterface {
    category_name: string, category_url: string
}

declare interface CategoryInterface {
    breadcrumbs: CategoryBreadcrumbsInterface[],
    description: string,
    image: string,
    name: string,
    title: string,
    uid: string,
    url: string
}
