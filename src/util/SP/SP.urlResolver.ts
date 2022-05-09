import { ApolloQueryResult } from '@apollo/client';
import BlogQuery from '@query/blog.query';
import categoryQuery from '@query/category.query';
import productQuery from '@query/product.query';
import urlQuery from '@query/url.query';
import { updateBlogCategory, updateBlogPost, updateBlogPosts } from '@store/blog.store';
import { updateCategory } from '@store/category.store';
import { updateProductList, updateProductsInformation, updateSingleProduct } from '@store/products.store';
import SPAbstract from '@util/SP/SP.abstract';
import { getProductVariablesBasedOnQuery } from '@util/SP/sp.helpers';

interface urlResolverInterface {
    type: string, sku?: string, id?: string | number
}

class SPUrlResolver extends SPAbstract {
    async initial() {
        await super.initial();
        await this.getUrlData();
    }

    async getUrlData() {
        try {
            const { data: { urlResolver } }: ApolloQueryResult<{
                urlResolver: urlResolverInterface
            }> = await this.request(urlQuery.urlResolver, { url: this.pathname });

            if (!urlResolver) {
                this.container = 'NotFound';
                return;
            }
            await this.getPageByType(urlResolver);
        } catch (e) {
            this.container = 'NotFound';
        }
    }

    async getPageByType({ id, sku, type }: urlResolverInterface) {
        if (type === 'CATEGORY') {
            await this.getCategory(id);
            return;
        }
        if (type === 'PRODUCT') {
            await this.getProduct(sku);
            return;
        }

        if (type === 'CMS_PAGE') {
            await this.getCmsPage({ id });
            return;
        }

        if (type === 'MF_BLOG_INDEX') {
            await this.getBlogCategory({ id });
            return;
        }

        if (type === 'MF_BLOG_POST') {
            await this.getBlogPost({ id });
            return;
        }

        // eslint-disable-next-line no-console
        console.info(`${type } not configured`);
    }

    async getBlogPost({ id }: { id: number | string }) {
        this.container = 'BlogPostPage';
        const { data: { blogPost } }: ApolloQueryResult<{
            blogPost: BlogPostInterface
        }> = await this.request(BlogQuery.blogPost, { id });

        this.store.dispatch(updateBlogPost(blogPost));
    }

    async getBlogCategory({ id }: { id: number | string }) {
        this.container = 'BlogCategoryPage';
        const { data: { blogCategory } }: ApolloQueryResult<{
            blogCategory: BlogCategoryInterface
        }> = await this.request(BlogQuery.blogCategory, { id });

        this.store.dispatch(updateBlogCategory(blogCategory));
        const { data: { blogPosts } }: ApolloQueryResult<{
            blogPosts: BlogPostsInterface
        }> = await this.request(BlogQuery.blogPosts, { filter: { category_id: { eq: id } } });

        this.store.dispatch(updateBlogPosts(blogPosts));
    }

    async getProduct(sku) {
        if (!sku) {
            throw new Error('sku is Required');
        }
        const { data: { singleProduct: { items: [singleProduct] } } }: ApolloQueryResult<{
            singleProduct: { items: ProductInterface[] }
        }> = await this.request(productQuery.product, { sku });

        this.container = 'ProductPage';

        this.store.dispatch(updateSingleProduct(singleProduct));
    }

    async getCategory(id: string | number) {
        if (!id) {
            throw new Error('id is Required');
        }
        this.container = 'CategoryPage';

        const { data: { categoryList: [category] } }: ApolloQueryResult<{
            categoryList: CategoryInterface[]
        }> = await this.request(categoryQuery.category, { id });

        this.store.dispatch(updateCategory(category));
        const variables = getProductVariablesBasedOnQuery(this.query, id);
        await this.getProductList(variables);
    }

    async getProductList(variables: object) {
        const { data: { productsInformation } }: ApolloQueryResult<{
            productsInformation: ProductsInformationInterface
        }> = await this.request(productQuery.productListInformation, variables);

        this.store.dispatch(updateProductsInformation(productsInformation));
        const { data: { products } } = await this.request(productQuery.productList, variables);
        this.store.dispatch(updateProductList(products));
    }
}

export default SPUrlResolver;
