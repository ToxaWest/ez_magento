import useInit from '@hook/useInit';
import { createElement } from 'react';

import AppComponent, { AppComponentInterface } from './App.component';

function AppContainer(props) {
    const [loading] = useInit();

    return createElement(AppComponent, { ...props, loading } as AppComponentInterface);
}

export default AppContainer;
