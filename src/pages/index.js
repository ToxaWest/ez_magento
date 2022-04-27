import App from '@component/App';

import CmsPage from 'Route/CmsPage';
import { getPropsBasedOnRequest } from 'Util/SP/sp.helpers';
import SPHome from 'Util/SP/SP.home';

const render = ({ container, state }) => (
    <App container={ container } state={ state }>
        <CmsPage />
    </App>
);

render.getInitialProps = async (ctx) => {
    const props = getPropsBasedOnRequest(ctx);
    const data = await new SPHome(props).getData();

    return {
        ...data
    };
};

export default render;
