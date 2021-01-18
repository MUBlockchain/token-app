/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from 'ethers'

import React from 'react';
import { StyleSheet, Image, BackHandler, TouchableHighlight, Text } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { Input, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { saveUserInformation } from '../../redux/actions/userActions';
import { createContract } from '../../redux/actions/contractActions'
import QueryHandler from '../../api/QueryHandler';
import Toast from 'react-native-root-toast';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import RNTorusDirectSdk from '@toruslabs/torus-direct-react-native-sdk';

GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '1062557508086-44j40vu7g0dg34pi32ae6kq3arjm6o1j.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    // hostedDomain: '', // specifies a hosted domain restriction
    // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    // accountName: '', // [Android] specifies an account name on the device that should be used
    // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

class LoginScreen extends React.Component {

    static navigationOptions = {
        headerShown: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            uuid: "",
            registerUuid: "",
            name: "",
            profilePic: "",
            refreshing: false,
            token: ""
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        RNTorusDirectSdk.init({
            browserRedirectUri: 'https://app.mubc.io/redirect.html',
            network: "testnet",  // details for test net
            proxyContractAddress: "0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183"
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.navigation.goBack();
        return true;
    }

    signIn = async () => {
        try {
            this.setState({ refreshing: true });
            const loginDetails = await RNTorusDirectSdk.triggerLogin({
                typeOfLogin: 'google',
                verifier: 'mubc-google',
                clientId: '1062557508086-44j40vu7g0dg34pi32ae6kq3arjm6o1j.apps.googleusercontent.com',
            });
            /* ===== User Info ==== */
            const { privateKey, publicAddress, userInfo } = loginDetails
            const { email, name, profileImage } = userInfo

            console.log('PRIVATE KEY: ', privateKey)
            console.log('PUBLIC ADDRESS: ', publicAddress)
            console.log('EMAIL: ', email)
            console.log('NAME: ', name)
            console.log('PROFILE IMAGE: ', profileImage)
            

            /* ===== Dummy User Info ==== */
            // const privateKey = 'ef75f981a22449c11633d7b5bd777bf290df125e172f84d4af84747801c00758', publicAddress = '0x48f06A6e2D876A2d41eCe3544069aA2d53D8847A', userInfo = 'userInfo'
            // const email = 'cookepf@miamioh.edu', name = 'Peter', profileImage = 'profilePic'


            // Save user information to app state
            console.log("Save User Info");
            this.props.saveUserInformation(privateKey, publicAddress, wallet, email, name, profileImage);

            /* =====  Wallet Info ==== */
            const provider = ethers.getDefaultProvider('kovan', {
                etherscan: '2M11INAC73PVBKQZPE1Q9F7U1PFGBAEPVH',
                infura: '72bcb1f96fb84102bce553ec23c407d4',
                alchemy: 'Z5XO8YjA452OZhw0Vgh30X0CINpD1tba'
            });

            const wallet = new ethers.Wallet(`0x${privateKey}`, provider);
            

            /* ===== Dummy Wallet Info ==== */
            

            // Create ethers contract instance
            console.log("Creating Contract...");
            await this.props.createContract(wallet);
            console.log("Contract Created");

            this.setState({ refreshing: false });
            // let exists = await this.props.userContract.role(publicAddress)
            // exists = exists.toNumber()
            console.log("Navigate");
            this.props.navigation.navigate('RegisterUser')
            // if(exists) {
            //     console.log('User Exists')
            //     //  this.props.navigation.navigate('Drawer');
            // } else {
            //     console.log('User Does Not Exist')
            //     this.props.navigation.navigate('Register')
            // }
           

        } catch (error) {
            console.log("ERROR: " + JSON.stringify(error));
        }
    };

    loginHandler = async () => {
        //Store uuid in store
        this.setState({ refreshing: true });
        await this.props.getUserProfile(this.state.uuid);
        this.setState({ refreshing: false });
        this.props.navigation.navigate('Drawer');
    }

    registerHandler = async () => {
        //Store uuid in store
        this.setState({ refreshing: true });
        console.log("Registering User...");

        let toast = Toast.show('Register User...', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });

        var res = await QueryHandler.registerUser(this.state.registerUuid, this.state.name);
        if (res) {
            let toast = Toast.show('Logging in User...', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0
            });
            await this.props.getUserProfile(this.state.registerUuid);
            this.setState({ refreshing: false });
            this.props.navigation.navigate('Drawer');
        } else {

        }

    }

    render() {
        return (
            <SafeAreaView style={styles.viewStyles}>
                <Image
                    source={require('../../images/logo.png')}
                    style={styles.logo}
                />

                <TouchableHighlight
                    style={styles.signIn}
                    onPress={this.signIn}
                    underlayColor='#fff'>
                    <Text style={[24, styles.signInText]}>Sign in with Google</Text>
                </TouchableHighlight>

            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        uniqueID: state.userReducer.uniqueID,
        name: state.userReducer.name,
        uuid: state.userReducer.uuid,
        balance: state.userReducer.balance,
        purchases: state.userReducer.purchases,
        profilePic: state.userReducer.profilePic,
        token: state.userReducer.token,
        userContract: state.contractReducer.userContract
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: (uuid, token, profilePic) => dispatch(getUserProfile(uuid, token, profilePic)),
        saveUserInformation: (privateKey, publicAddress, wallet, email, name, profileImage) => dispatch(saveUserInformation(privateKey, publicAddress, wallet, email, name, profileImage)),
        createContract: privateKey => dispatch(createContract(privateKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoginScreen));


const styles = StyleSheet.create({
    logo: {
        width: 250,
        height: 250
    },
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    },
    signIn: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 25,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 45,
        paddingLeft: 45,
        backgroundColor: '#C9102E',
        borderRadius: 40,
        borderWidth: 0,
        borderColor: '#fff'
    },
    signInText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    }
});
