import App from 'Component/App';
import { getPropsBasedOnRequest } from 'Util/SP/sp.helpers';
import SPUrlResolver from 'Util/SP/SP.urlResolver';

const render = ({ container, state }) => <App container={ container } state={ state } />;

render.getInitialProps = async (ctx) => {
    const props = getPropsBasedOnRequest(ctx);
    const data = await new SPUrlResolver(props).getData();

    return {
        ...data
    };
};

export default render;
