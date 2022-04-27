/*
 * Copyright (c) 2022. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

import Breadcrumbs from '@component/Breadcrumbs';
import Header from '@component/Header';
import Loader from '@component/Loader';
import Notifications from '@component/Notifications';
import PropTypes from 'prop-types';

import AccountPage from 'Route/AccountPage';
import CartPage from 'Route/CartPage';
import CategoryPage from 'Route/CategoryPage';
import CheckoutPage from 'Route/CheckoutPage';
import CheckoutSuccessPage from 'Route/CheckoutSuccessPage';
import CmsPage from 'Route/CmsPage';
import ProductPage from 'Route/ProductPage';

function AppComponent(props) {
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
}

AppComponent.propTypes = {
    container: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
};

export default AppComponent;
