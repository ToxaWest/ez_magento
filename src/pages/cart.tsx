import App from '@component/App';
import CartPage from '@route/CartPage';
import SPAbstract from '@util/SP/SP.abstract';
import { ctxInterface, getPropsBasedOnRequest } from '@util/SP/sp.helpers';
import { ReactElement } from 'react';

const render = ({ state }): ReactElement => (
    <App container="CartPage" state={ state }>
        <CartPage />
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
