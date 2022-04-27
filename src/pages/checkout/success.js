import App from '@component/App';

import CheckoutSuccessPage from 'Route/CheckoutSuccessPage';
import SPAbstract from 'Util/SP/SP.abstract';
import { getPropsBasedOnRequest } from 'Util/SP/sp.helpers';

const render = ({ state }) => (
    <App container="CheckoutSuccessPage" state={ state }>
        <CheckoutSuccessPage />
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
