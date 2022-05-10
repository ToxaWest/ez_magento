import useInit from '@hook/useInit';
import { createElement, ReactElement } from 'react';

import AppComponent, { AppComponentInterface } from './App.component';

function AppContainer(props): ReactElement {
    const [loading] = useInit();

    return createElement(AppComponent, { ...props, loading } as AppComponentInterface);
}

export default AppContainer;
