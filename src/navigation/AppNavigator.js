import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import DrawerNavigator from "./DrawerNavigator";

const AppNavigator = createAppContainer(createSwitchNavigator({
        Splash: SplashScreen,
        Login: LoginScreen,
        Register: RegisterScreen,
        Drawer: DrawerNavigator
    },
    {
        initialRouteName: 'Splash'
    }
));

export default AppNavigator;
