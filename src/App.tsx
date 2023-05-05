import { SnackbarProvider } from 'notistack';
import './App.css';
import RouteApp from './Routers/RouteApp';
import { Provider } from 'react-redux';
import { storeToken } from './Reducers';

function App() {
  return (
    <Provider store={storeToken}>
      <SnackbarProvider maxSnack={3}>
        <RouteApp />
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
