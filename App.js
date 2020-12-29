import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import configureStore from './src/redux/index'



const store = configureStore();
const config = {
    screens: {
        DrawerNavigator: 'home'
    }
}
const linking = {
    prefixes: ['mubcapp://'],
    config
}

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppNavigator linking={linking}/>
            </Provider>
        );
    }
}

export default App;
