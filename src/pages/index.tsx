import App from '@component/App';
import CmsPage from '@route/CmsPage';
import { ctxInterface, getPropsBasedOnRequest } from '@util/SP/sp.helpers';
import SPHome from '@util/SP/SP.home';
import { ReactElement } from 'react';

const render = ({ container, state }): ReactElement => (
    <App container={ container } state={ state }>
        <CmsPage />
    </App>
);

render.getInitialProps = async (ctx: ctxInterface) => {
    const props = getPropsBasedOnRequest(ctx);
    const data = await new SPHome(props).getData();

    return {
        ...data
    };
};

export default render;
