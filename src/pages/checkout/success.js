import App from 'Component/App';
import SPAbstract from 'Util/SP/SP.abstract';
import { getPropsBasedOnRequest } from 'Util/SP/sp.helpers';

const render = ({ state }) => <App container="CheckoutSuccessPage" state={ state } />;

render.getInitialProps = async (ctx) => {
    const props = getPropsBasedOnRequest(ctx);
    const data = await new SPAbstract(props).getData();

    return {
        ...data
    };
};

export default render;
