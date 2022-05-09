import Breadcrumbs from '@component/Breadcrumbs';
import Header from '@component/Header';
import Meta from '@component/Meta';
import Notifications from '@component/Notifications';
import { RootState } from '@store/index';
import Loader from '@ui/Loader';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

export interface AppComponentInterface {
    children?: ReactElement,
    loading: boolean
}

function AppComponent(props: AppComponentInterface): JSX.Element {
    const {
        children,
        loading
    } = props;

    const getRouteByPage = () => {
        if (children) {
            return children;
        }

        // eslint-disable-next-line no-console
        console.info('Route not configured');
        return <div />;
    };

    const { showBreadcrumbs } = useSelector((state: RootState) => state.breadcrumbs);
    const { show_cms_breadcrumbs } = useSelector((state: RootState) => state.config.config);

    const isShowBreadcrumbs = Boolean(show_cms_breadcrumbs);

    const getMainStyles = (): object => {
        const styles = {};

        if (!isShowBreadcrumbs || !showBreadcrumbs) {
            styles['--breadcrumbs-height'] = '0px';
        }

        return styles;
    };

    return (
        <div>
            <Loader isLoading={ loading } isMain />
            <Meta />
            <Notifications />
            <Header />
            <main style={ getMainStyles() }>
                <Breadcrumbs />
                { getRouteByPage() }
            </main>
        </div>
    );
}
AppComponent.defaultProps = {
    children: null
};

export default AppComponent;
