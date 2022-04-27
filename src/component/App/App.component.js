import Breadcrumbs from '@component/Breadcrumbs';
import Header from '@component/Header';
import Loader from '@component/Loader';
import Notifications from '@component/Notifications';
import PropTypes from 'prop-types';

function AppComponent(props) {
    const {
        container,
        loading,
        children
    } = props;

    const getRouteByPage = () => {
        if (children) {
            return children;
        }

        // eslint-disable-next-line no-console
        console.info(`Route not configured: ${container}`);
        return <div />;
    };

    return (
        <>
            <Loader isLoading={ loading } isMain />
            <Notifications />
            <Header />
            <main>
                <Breadcrumbs />
                { getRouteByPage() }
            </main>
        </>
    );
}
AppComponent.defaultProps = {
    children: null
};
AppComponent.propTypes = {
    container: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    children: PropTypes.node
};

export default AppComponent;
