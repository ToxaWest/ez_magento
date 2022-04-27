import App from '@component/App';

import CartPage from 'Route/CartPage';
import SPAbstract from 'Util/SP/SP.abstract';
import { getPropsBasedOnRequest } from 'Util/SP/sp.helpers';

const render = ({ state }) => (
    <App container="CartPage" state={ state }>
        <CartPage />
    </App>
);

render.getInitialProps = async (ctx) => {
    const props = getPropsBasedOnRequest(ctx);
    const data = await new SPAbstract(props).getData();

    return {
        ...data
    };
};

export default render;
