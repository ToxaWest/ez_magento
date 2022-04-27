import categoryQuery from 'Query/category.query';
import productQuery from 'Query/product.query';
import urlQuery from 'Query/url.query';
import { updateCategoryBreadcrumbs, updateProductsBreadcrumbs } from 'Store/breadcrumbs.store';
import { updateCategory } from 'Store/category';
import { updateProductList, updateProductsInformation, updateSingleProduct } from 'Store/products';
import SPAbstract from 'Util/SP/SP.abstract';
import { getProductVariablesBasedOnQuery } from 'Util/SP/sp.helpers';

class SPUrlResolver extends SPAbstract {
    async initial() {
        await super.initial();
        await this.getUrlData();
    }

    async getUrlData() {
        try {
            const { data: { urlResolver } } = await this.request(urlQuery.urlResolver, { url: this.pathname });

            if (!urlResolver) {
                this.container = 'NotFound';
                return;
            }
            await this.getPageByType(urlResolver);
        } catch (e) {
            this.container = 'NotFound';
        }
    }

    async getPageByType({ type, sku, id }) {
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
        const {
            data: { singleProduct: { items: [singleProduct] } }
        } = await this.request(productQuery.product, { sku });

        this.container = 'ProductPage';
        this.store.dispatch(updateProductsBreadcrumbs(singleProduct));

        this.store.dispatch(updateSingleProduct(singleProduct));
    }

    async getCategory(id) {
        if (!id) {
            throw new Error('id is Required');
        }
        this.container = 'CategoryPage';

        const { data: { categoryList: [category] } } = await this.request(categoryQuery.category, { id });
        this.store.dispatch(updateCategoryBreadcrumbs(category));
        this.store.dispatch(updateCategory(category));
        const variables = getProductVariablesBasedOnQuery(this.query, id);
        await this.getProductList(variables);
    }

    async getProductList(variables) {
        const { data: { productsInformation } } = await this.request(productQuery.productListInformation, variables);
        this.store.dispatch(updateProductsInformation(productsInformation));
        const { data: { products } } = await this.request(productQuery.productList, variables);
        this.store.dispatch(updateProductList(products));
    }
}

export default SPUrlResolver;
