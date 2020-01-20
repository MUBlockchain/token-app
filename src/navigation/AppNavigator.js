import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen"

const AppNavigator = createAppContainer(createSwitchNavigator({
        Splash: SplashScreen,
        Login: LoginScreen,
        Home: HomeScreen
    },
    {
        initialRouteName: 'Splash'
    }
));

export default AppNavigator;
