import App from '@component/App';
import BlogCategoryPage from '@route/BlogCategoryPage';
import BlogPostPage from '@route/BlogPostPage';
import CategoryPage from '@route/CategoryPage';
import CmsPage from '@route/CmsPage';
import ProductPage from '@route/ProductPage';
import { ctxInterface, getPropsBasedOnRequest } from '@util/SP/sp.helpers';
import SPUrlResolver from '@util/SP/SP.urlResolver';
import React from 'react';

interface allPageInterface {
    container: string
    state
}

const render = ({ container, state }: allPageInterface) => {
    const routes = {
        CategoryPage,
        CmsPage,
        ProductPage,
        BlogCategoryPage,
        BlogPostPage
    };

    const Component = routes[container] || 'div' as React.ComponentType | React.FC | string;

    return (
        <App container={ container } state={ state }>
            <Component />
        </App>
    );
};

render.getInitialProps = async (ctx: ctxInterface) => {
    const props = getPropsBasedOnRequest(ctx);
    const data = await new SPUrlResolver(props).getData();

    return {
        ...data
    };
};

export default render;
