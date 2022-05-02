declare interface BreadcrumbInterface {
    url: string,
    name: string
}

declare interface CategoryBreadcrumbsInterface {
    category_name: string, category_url: string
}

declare interface CategoryInterface {
    description: string,
    name: string,
    image: string,
    url: string,
    title: string,
    uid: string,
    breadcrumbs: CategoryBreadcrumbsInterface[]
}
