import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const getInitialState = (): BlogReducerInterface => {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return window.__NEXT_DATA__.props.pageProps.state.blog as BlogReducerInterface;
    }

    return {
        currentCategory: {
            breadcrumbs: [],
            title: ''
        },
        blogPosts: {
            total_count: 1,
            total_pages: 1,
            items: []
        },
        blogPost: {
            author: {
                author_url: '',
                name: ''
            },
            creation_time: '',
            filtered_content: '',
            first_image: '',
            post_id: -1,
            post_url: '',
            title: ''
        }
    };
};

const blogReducer = createSlice({
    initialState: getInitialState(),
    name: 'blog',
    reducers: {
        updateBlogCategory: (state, { payload }: PayloadAction<BlogCategoryInterface>) => {
            state.currentCategory = payload;
        },
        updateBlogPosts: (state, { payload }: PayloadAction<BlogPostsInterface>) => {
            state.blogPosts = payload;
        },
        updateBlogPost: (state, { payload }: PayloadAction<BlogPostInterface>) => {
            state.blogPost = payload;
        }
    }
});

export const { updateBlogCategory, updateBlogPost, updateBlogPosts } = blogReducer.actions;
export default blogReducer.reducer;
