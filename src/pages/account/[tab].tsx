import App from '@component/App';
import AccountPage from '@route/AccountPage';
import SPAbstract from '@util/SP/SP.abstract';
import { ctxInterface, getPropsBasedOnRequest } from '@util/SP/sp.helpers';
import { ReactElement } from 'react';

const render = ({ state }):ReactElement => (
    <App container="AccountPage" state={ state }>
        <AccountPage />
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
