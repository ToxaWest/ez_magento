import Breadcrumbs from '@component/Breadcrumbs';
import Header from '@component/Header';
import Notifications from '@component/Notifications';
import Loader from '@ui/Loader';
import { ReactElement } from 'react';

interface AppComponentInterface {
    loading: boolean,
    children?: ReactElement
}

function AppComponent(props: AppComponentInterface): ReactElement {
    const {
        loading,
        children
    } = props;

    const getRouteByPage = () => {
        if (children) {
            return children;
        }

        // eslint-disable-next-line no-console
        console.info('Route not configured');
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

export default AppComponent;
