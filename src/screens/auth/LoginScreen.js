/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import "@ethersproject/shims"
import { ethers } from 'ethers'
import React from 'react';
import { StyleSheet, Image, BackHandler, TouchableHighlight, Text } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { saveUserInformation } from '../../redux/actions/userActions';
import { createContract } from '../../redux/actions/contractActions'
import RNTorusDirectSdk from '@toruslabs/torus-direct-react-native-sdk';
import { ETHERSCAN, INFURA, ALCHEMY, CLIENT_ID, VERIFIER, BROWSER_REDIRECT } from '@env'

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
            browserRedirectUri: BROWSER_REDIRECT,
            enableLogging: true
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
            // this.setState({ refreshing: true });
            
            const loginDetails = await RNTorusDirectSdk.triggerLogin({
                typeOfLogin: 'google',
                verifier: VERIFIER,
                clientId: CLIENT_ID,
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


            /* =====  Wallet Info ==== */
            // const provider = ethers.getDefaultProvider('kovan', {
            //     etherscan: ETHERSCAN,
            //     infura: INFURA,
            //     alchemy: ALCHEMY
            // });

            // const wallet = new ethers.Wallet(`0x${privateKey}`, provider);

            // this.props.saveUserInformation(privateKey, publicAddress, wallet, email, name, profileImage);

            // this.setState({ refreshing: false });
            // let exists = await this.props.userContract.role(publicAddress)
            // exists = exists.toNumber()
            // console.log("Navigate");
            
            //this.props.navigation.navigate('RegisterUser')

            // Logic for navigation
            // if(exists) {
            //     console.log('User Exists')
            //     //  this.props.navigation.navigate('Drawer');
            // } else {
            //     console.log('User Does Not Exist')
            //     this.props.navigation.navigate('Register')
            // }
           
            // this.props.navigation.navigate('Drawer');

        } catch (error) {
            console.log("ERROR: " + JSON.stringify(error));
        }
    };

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
