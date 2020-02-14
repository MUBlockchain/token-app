/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { BackHandler } from 'react-native';
import { View, Text, StyleSheet, Image, Input, Icon, Button, TextInput } from 'react-native';
import { createAppContainer, SafeAreaView } from 'react-navigation';

class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            email: ""
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

        this.props.navigation.navigate('Drawer');
    }

  render() {
    return (
      <SafeAreaView style={styles.viewStyles}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            value={"Username"}
          />

          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            value={"Password"}
          />

          <Button
            title="Login"
            onPress={this.loginHandler}
          />
      </SafeAreaView>
    );
  }
}

export default LoginScreen;


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
