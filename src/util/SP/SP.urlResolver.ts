import { ApolloQueryResult } from '@apollo/client';
import categoryQuery from '@query/category.query';
import productQuery from '@query/product.query';
import urlQuery from '@query/url.query';
import {
    CategoryInterface,
    ProductsInterface,
    updateCategoryBreadcrumbs,
    updateProductsBreadcrumbs
} from '@store/breadcrumbs.store';
import { updateCategory } from '@store/category.store';
import { updateProductList, updateProductsInformation, updateSingleProduct } from '@store/products.store';
import SPAbstract from '@util/SP/SP.abstract';
import { getProductVariablesBasedOnQuery } from '@util/SP/sp.helpers';

interface urlResolverInterface {
    type:string, sku?: string, id?: string | number
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

    async getPageByType({ type, sku, id }: urlResolverInterface) {
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

        // eslint-disable-next-line no-console
        console.info(`${type } not configured`);
    }

    async getProduct(sku) {
        if (!sku) {
            throw new Error('sku is Required');
        }
        const { data: { singleProduct: { items: [singleProduct] } } }: ApolloQueryResult<{
            singleProduct: { items: ProductsInterface[] }
        }> = await this.request(productQuery.product, { sku });

        this.container = 'ProductPage';
        this.store.dispatch(updateProductsBreadcrumbs(singleProduct));

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

        this.store.dispatch(updateCategoryBreadcrumbs(category));
        this.store.dispatch(updateCategory(category));
        const variables = getProductVariablesBasedOnQuery(this.query, id);
        await this.getProductList(variables);
    }

    async getProductList(variables: object) {
        const { data: { productsInformation } } = await this.request(productQuery.productListInformation, variables);
        this.store.dispatch(updateProductsInformation(productsInformation));
        const { data: { products } } = await this.request(productQuery.productList, variables);
        this.store.dispatch(updateProductList(products));
    }
}

export default SPUrlResolver;
