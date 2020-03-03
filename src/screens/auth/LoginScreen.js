/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { BackHandler } from 'react-native';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { createAppContainer, SafeAreaView, withNavigation } from 'react-navigation';
import { Input, Button, Icon, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/actions/userActions'

class LoginScreen extends React.Component {

    static navigationOptions = {
        headerShown: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            uuid: "",
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
        this.props.getUserProfile(this.state.uuid);
        this.setState({ refreshing: false });
        this.props.navigation.navigate('Drawer');
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
