declare interface BlogCategoryBreadcrumbsInterface {
    category_name: string,
    category_url_path: string
}

declare interface BlogCategoryInterface {
    breadcrumbs: BlogCategoryBreadcrumbsInterface[]
    content?: string,
    content_heading?:string,
    title: string
}

declare interface BlogAuthorInterface {
    author_url: string,
    name: string
}

declare interface BlogPostInterface {
    author: BlogAuthorInterface,
    creation_time: string,
    filtered_content: string,
    first_image: string,
    post_id: number,
    post_url: string,
    title: string
}

declare interface BlogPostsInterface {
    items: BlogPostInterface[],
    total_count: number,
    total_pages: number
}

declare interface BlogReducerInterface {
    blogPost: BlogPostInterface
    blogPosts: BlogPostsInterface
    currentCategory: BlogCategoryInterface
}
