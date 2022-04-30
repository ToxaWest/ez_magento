declare interface CategoryInterface {
    description: string,
    name: string,
    image: string,
    url: string,
    breadcrumbs: {
        category_name: string, category_url: string
    }[]
}
