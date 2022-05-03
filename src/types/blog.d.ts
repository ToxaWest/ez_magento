declare interface BlogCategoryBreadcrumbsInterface {
    category_name: string,
    category_url_path: string
}

declare interface BlogCategoryInterface {
    breadcrumbs: BlogCategoryBreadcrumbsInterface[]
    title: string,
    content?: string,
    content_heading?:string
}

declare interface BlogAuthorInterface {
    name: string,
    author_url: string
}

declare interface BlogPostInterface {
    first_image: string,
    filtered_content: string,
    title: string,
    post_url: string,
    post_id: number,
    creation_time: string,
    author: BlogAuthorInterface
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
