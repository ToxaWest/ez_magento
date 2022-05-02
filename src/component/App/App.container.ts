import { createElement } from 'react';

import AppComponent, { AppComponentInterface } from './App.component';
// import useInit from '@hook/useInit';

function AppContainer(props) {
    // const [loading] = useInit();

    return createElement(AppComponent, { ...props, loading: false } as AppComponentInterface);
}

export default AppContainer;
