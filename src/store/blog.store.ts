import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const getInitialState = () => {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return window.__NEXT_DATA__.props.pageProps.state.blog as BlogReducerInterface;
    }

    return {
        currentCategory: {
            title: ''
        },
        blogPosts: {
            total_count: 1,
            total_pages: 1,
            items: []
        },
        blogPost: {}
    };
};

const blogReducer = createSlice({
    initialState: getInitialState() as BlogReducerInterface,
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

export const { updateBlogCategory, updateBlogPosts, updateBlogPost } = blogReducer.actions;
export default blogReducer.reducer;
