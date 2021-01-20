/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { BackHandler } from 'react-native';
import { StyleSheet, Image } from 'react-native';
import {  SafeAreaView } from 'react-navigation';

class SplashScreen extends React.Component {

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
            () => { resolve('result') },
            2500
        )
    )
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick = () => {
  // Do nothing yeet
  return true;
}

async componentDidMount() {
    const data = await this.performTimeConsumingTask();
    this.props.navigation.navigate('Login');
    
  //This is where we will check if user data has been saved for auto login
}

  render() {
    return (
      <SafeAreaView style={styles.viewStyles}>
        <Image
          source={require('../../images/logo.png')}
          style={styles.logo}
        />
      </SafeAreaView>
    );
  }
}


export default SplashScreen;


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
