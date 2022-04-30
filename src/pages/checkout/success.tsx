import App from '@component/App';
import CheckoutSuccessPage from '@route/CheckoutSuccessPage';
import SPAbstract from '@util/SP/SP.abstract';
import { ctxInterface, getPropsBasedOnRequest } from '@util/SP/sp.helpers';

const render = ({ state }) => (
    <App container="CheckoutSuccessPage" state={ state }>
        <CheckoutSuccessPage />
    </App>
);

render.getInitialProps = async (ctx: ctxInterface) => {
    const props = getPropsBasedOnRequest(ctx);
    const data = await new SPAbstract(props).getData();

    return {
        ...data
    };
};

export default render;
