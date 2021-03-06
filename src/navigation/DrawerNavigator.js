import React from 'react';
import { Dimensions, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import DrawerComponent from './DrawerComponent';
import HomeScreen from '../screens/HomeScreen';
import RedeemScreen from '../screens/RedeemScreen';
import RewardsScreen from '../screens/RewardsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RewardsOverviewScreen from '../screens/RewardsOverviewScreen'
import BountiesScreen from '../screens/BountiesScreen'

/**
 * Variables
 */
const { width } = Dimensions.get('window');
const drawerWidth = width * 0.70;

/**
 * Need to Create Stack for Each Screen
 */
const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    path: 'home'
});

/*
const RedeemStack = createStackNavigator({
    Redeem: {
        screen: RedeemScreen
    }
});
*/

const RewardsStack = createStackNavigator({
    Rewards: {
        screen: RewardsScreen
    },
    RewardsOverview: {
        screen: RewardsOverviewScreen
    }
});

const BountiesStack = createStackNavigator({
    Bounties : {
        screen: BountiesScreen
    }
})

const ProfileStack = createStackNavigator({
    Profile: {
        screen: ProfileScreen
    }
});

const LoginStack = createStackNavigator({
    Login: {
        screen: LoginScreen
    }
});

const RegisterStack = createStackNavigator({
    RegisterUser: {
        screen: RegisterScreen
    }
});



const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            drawerIcon: ({tintColor}) => 
                <Icon 
                    name="home" 
                    color={tintColor} 
                    type="font-awesome" 
                    size={24} 
                />
        }
    },
    Bounties: {
        screen: BountiesStack,
        navigationOptions: {
            drawerIcon: ({tintColor}) => 
                <Icon 
                    name="map" 
                    color={tintColor} 
                    type="font-awesome" 
                    size={24} 
                />
        }
    },
    Rewards: {
        screen: RewardsStack,
        navigationOptions: {
            drawerIcon: ({tintColor}) => 
                <Icon 
                    name="trophy" 
                    color={tintColor} 
                    type="font-awesome" 
                    size={24} 
                />
        }
    },
    Logout: {
        screen: LoginStack,
        navigationOptions: {
            drawerIcon: ({tintColor}) => 
                <Icon 
                    name="sign-out" 
                    color={tintColor} 
                    type="font-awesome" 
                    size={24} 
                />
        }
    },
    RegisterUser: {
        screen: RegisterStack,
    }
    /*
    Redeem: {
        screen: RedeemStack,
        navigationOptions: {
            drawerIcon: ({tintColor}) => 
                <Icon 
                    name="key" 
                    color={tintColor} 
                    type="font-awesome" 
                    size={24} 
                />
        }
    },
    
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            drawerIcon: ({tintColor}) => 
                <Icon 
                    name="user" 
                    color={tintColor} 
                    type="font-awesome" 
                    size={24} 
                />
        }
    },
    */
}, { 
    initialRouteName: "Home",
    contentComponent: DrawerComponent,
    drawerWidth: drawerWidth,
    contentOptions: {
        itemsContainerStyle: {
            marginVertical: 0,
            paddingVertical: 0
        },
        iconContainerStyle: {
            marginLeft: 20,
            marginRight: 8
        },
        labelStyle: {
            fontSize: 16
        },
        activeTintColor: '#C3142D',
        activeBackgroundColor: "#DAEFFF"
    }
});

export default DrawerNavigator;
