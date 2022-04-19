import App from 'Component/App';
import { getPropsBasedOnRequest } from 'Util/SP/sp.helpers';
import SPHome from 'Util/SP/SP.home';

const render = ({ container, state }) => <App container={ container } state={ state } />;

render.getInitialProps = async (ctx) => {
    const props = getPropsBasedOnRequest(ctx);
    const data = await new SPHome(props).getData();

    return {
        ...data
    };
};

export default render;
