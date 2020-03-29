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
