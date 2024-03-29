import { gql } from '@apollo/client';
import {
    blogCategory, blogPost, blogPosts, postCardFragment
} from '@graphql/index';

const BlogQuery = {
    blogCategory: gql`
        ${blogCategory}`,
    blogPosts: gql`
        ${postCardFragment}
        ${blogPosts}
    `,
    blogPost: gql`
        ${postCardFragment}
        ${blogPost}
    `
};

export default BlogQuery;
