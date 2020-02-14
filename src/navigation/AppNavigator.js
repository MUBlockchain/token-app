import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from "../screens/auth/LoginScreen";
import DrawerNavigator from "./DrawerNavigator";

const AppNavigator = createAppContainer(createSwitchNavigator({
        Splash: SplashScreen,
        Login: LoginScreen,
        Drawer: DrawerNavigator
    },
    {
        initialRouteName: 'Splash'
    }
));

export default AppNavigator;
