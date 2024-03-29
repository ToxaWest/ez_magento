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
    id?: string | number, sku?: string, type: string
}

class SPUrlResolver extends SPAbstract {
    async initial(): Promise<void> {
        await super.initial();
        await this.getUrlData();
    }

    async getUrlData(): Promise<void> {
        try {
            const { data: { urlResolver } } = await this.request<{
                urlResolver: urlResolverInterface
            }>(urlQuery.urlResolver, { url: this.pathname });

            if (!urlResolver) {
                this.container = 'NotFound';
                return;
            }
            await this.getPageByType(urlResolver);
        } catch (e) {
            this.container = 'NotFound';
        }
    }

    async getPageByType({ id, sku, type }: urlResolverInterface): Promise<void> {
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

    async getBlogPost({ id }: { id: number | string }) : Promise<void> {
        this.container = 'BlogPostPage';
        const { data: { blogPost } } = await this.request<{
            blogPost: BlogPostInterface
        }>(BlogQuery.blogPost, { id });

        this.store.dispatch(updateBlogPost(blogPost));
    }

    async getBlogCategory({ id }: { id: number | string }): Promise<void> {
        this.container = 'BlogCategoryPage';
        const { data: { blogCategory } } = await this.request<{
            blogCategory: BlogCategoryInterface
        }>(BlogQuery.blogCategory, { id });

        this.store.dispatch(updateBlogCategory(blogCategory));
        const { data: { blogPosts } } = await this.request<{
            blogPosts: BlogPostsInterface
        }>(BlogQuery.blogPosts, { filter: { category_id: { eq: id } } });

        this.store.dispatch(updateBlogPosts(blogPosts));
    }

    async getProduct(sku): Promise<void> {
        if (!sku) {
            throw new Error('sku is Required');
        }
        const { data: { singleProduct: { items: [singleProduct] } } } = await this.request<{
            singleProduct: { items: ProductInterface[] }
        }>(productQuery.product, { sku });

        this.container = 'ProductPage';

        this.store.dispatch(updateSingleProduct(singleProduct));
    }

    async getCategory(id: string | number): Promise<void> {
        if (!id) {
            throw new Error('id is Required');
        }
        this.container = 'CategoryPage';

        const { data: { categoryList: [category] } } = await this.request<{
            categoryList: CategoryInterface[]
        }>(categoryQuery.category, { id });

        this.store.dispatch(updateCategory(category));
        const variables = getProductVariablesBasedOnQuery(this.query, id);
        await this.getProductList(variables);
    }

    async getProductList(variables: object): Promise<void> {
        const { data: { productsInformation } } = await this.request<{
            productsInformation: ProductsInformationInterface
        }>(productQuery.productListInformation, variables);

        this.store.dispatch(updateProductsInformation(productsInformation));
        const { data: { products } } = await this.request<{ products: { items: ProductInterface[] } }
            >(productQuery.productList, variables);

        this.store.dispatch(updateProductList(products));
    }
}

export default SPUrlResolver;
