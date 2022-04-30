import AppComponent from './App.component';
// import useInit from '@hook/useInit';

function AppContainer(props) {
    // const [loading] = useInit();

    return (
      <AppComponent { ...props } loading={ false } />
    );
}

export default AppContainer;
