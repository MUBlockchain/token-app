/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { BackHandler } from 'react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { Input, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/actions/userActions';
import QueryHandler from '../../api/QueryHandler';
import Toast from 'react-native-root-toast';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';


GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '733695350424-2otstlu8iurn4fq77l5f608ghks856ht.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    // hostedDomain: '', // specifies a hosted domain restriction
    // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    // accountName: '', // [Android] specifies an account name on the device that should be used
    // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });

// GoogleSignin.configure();
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
            refreshing: false
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
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
          const hasPlayServices = await GoogleSignin.hasPlayServices();
          console.log(hasPlayServices);
          const userInfo = await GoogleSignin.signIn();
          // console.log(JSON.stringify(userInfo));
          const id_token = await GoogleSignin.getTokens();
          this.setState({ userInfo });
          console.log(JSON.stringify(id_token.idToken));
          const r = await QueryHandler.signIn(id_token.idToken);
          //console.log(r);
          // this.props.navigation.navigate('Drawer');
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log("user cancelled the login flow");
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (f.e. sign in) is in progress already
            console.log("operation (f.e. sign in) is in progress already");
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            console.log("play services not available or outdated");
          } else {
            // some other error happened
            console.log("some other error happened");
            console.log(error);
          }
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
                <GoogleSigninButton
                    style={{ width: 192, height: 56 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn}
                    disabled={this.state.isSigninInProgress} 
                    onPress={this.signIn}
                />
                <Input
                    placeholder="Miami UUID"
                    leftIcon={
                        <Icon
                            name="email"
                            type="material"
                            size={27}
                        />
                    }
                    leftIconContainerStyle={styles.iconContainer}
                    shake={true}
                    onChangeText={(value) => this.setState({ uuid: value })}
                    value={this.state.uuid}
                    containerStyle={styles.inputOuterContainer}
                    inputContainerStyle={styles.inputInnerContainer}
                    inputStyle={styles.input}
                />

                <Button
                    title="Login"
                    onPress={this.loginHandler}
                />
                <Input
                    placeholder="Miami UUID To Register"
                    leftIcon={
                        <Icon
                            name="email"
                            type="material"
                            size={27}
                        />
                    }
                    leftIconContainerStyle={styles.iconContainer}
                    shake={true}
                    onChangeText={(value) => this.setState({ registerUuid: value })}
                    value={this.state.registerUuid}
                    containerStyle={styles.inputOuterContainer}
                    inputContainerStyle={styles.inputInnerContainer}
                    inputStyle={styles.input}
                />
                <Input
                    placeholder="Name"
                    leftIcon={
                        <Icon
                            name="email"
                            type="material"
                            size={27}
                        />
                    }
                    leftIconContainerStyle={styles.iconContainer}
                    shake={true}
                    onChangeText={(value) => this.setState({ name: value })}
                    value={this.state.name}
                    containerStyle={styles.inputOuterContainer}
                    inputContainerStyle={styles.inputInnerContainer}
                    inputStyle={styles.input}
                />

                <Button
                    title="Register"
                    onPress={this.registerHandler}
                />
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
        purchases: state.userReducer.purchases
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: (uuid) => dispatch(getUserProfile(uuid))
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
        backgroundColor: 'white'
    },
    textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    }
});
