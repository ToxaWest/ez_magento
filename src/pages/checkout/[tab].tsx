import App from '@component/App';
import CheckoutPage from '@route/CheckoutPage';
import SPAbstract from '@util/SP/SP.abstract';
import { ctxInterface, getPropsBasedOnRequest } from '@util/SP/sp.helpers';
import { ReactElement } from 'react';

const render = ({ state }): ReactElement => (
    <App container="CheckoutPage" state={ state }>
        <CheckoutPage />
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
