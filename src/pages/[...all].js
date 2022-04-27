import App from '@component/App';

import CategoryPage from 'Route/CategoryPage';
import CmsPage from 'Route/CmsPage';
import ProductPage from 'Route/ProductPage';
import { getPropsBasedOnRequest } from 'Util/SP/sp.helpers';
import SPUrlResolver from 'Util/SP/SP.urlResolver';

const render = ({ container, state }) => {
    const routes = {
        CategoryPage,
        CmsPage,
        ProductPage
    };

    const Component = routes[container] || 'div';

    return (
        <App container={ container } state={ state }>
            <Component />
        </App>
    );
};

render.getInitialProps = async (ctx) => {
    const props = getPropsBasedOnRequest(ctx);
    const data = await new SPUrlResolver(props).getData();

    return {
        ...data
    };
};

export default render;
