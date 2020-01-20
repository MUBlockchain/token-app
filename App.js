import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import AppNavigator from './src/navigation/AppNavigator';


class App extends React.Component {
  render() {
      return(
        <MenuProvider>
          <AppNavigator />
        </MenuProvider>
      );
  }
}

export default App;
