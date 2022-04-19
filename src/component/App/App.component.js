import PropTypes from 'prop-types';

import Breadcrumbs from 'Component/Breadcrumbs';
import Header from 'Component/Header';
import Loader from 'Component/Loader';
import Notifications from 'Component/Notifications';
import AccountPage from 'Route/AccountPage';
import CartPage from 'Route/CartPage';
import CategoryPage from 'Route/CategoryPage';
import CheckoutPage from 'Route/CheckoutPage';
import CheckoutSuccessPage from 'Route/CheckoutSuccessPage';
import CmsPage from 'Route/CmsPage';
import ProductPage from 'Route/ProductPage';

const AppComponent = (props) => {
    const {
        container,
        loading
    } = props;

    const getRouteByPage = () => {
        const routes = {
            AccountPage,
            CartPage,
            CategoryPage,
            CheckoutPage,
            CheckoutSuccessPage,
            CmsPage,
            ProductPage
        };

        const Component = routes[container];
        if (Component) {
            return <Component />;
        }

        // eslint-disable-next-line no-console
        console.info(`Route not configured: ${container}`);
        return <div />;
    };

    return (
        <div>
            <Loader isLoading={ loading } isMain />
            <Notifications />
            <Header />
            <main>
                <Breadcrumbs />
                { getRouteByPage() }
            </main>
        </div>
    );
};

AppComponent.propTypes = {
    container: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
};

export default AppComponent;
