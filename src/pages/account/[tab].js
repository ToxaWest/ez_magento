import App from '@component/App';

import AccountPage from 'Route/AccountPage';
import SPAbstract from 'Util/SP/SP.abstract';
import { getPropsBasedOnRequest } from 'Util/SP/sp.helpers';

const render = ({ state }) => (
    <App container="AccountPage" state={ state }>
        <AccountPage />
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
