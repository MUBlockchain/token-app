import React from 'react';
import { BackHandler } from 'react-native';
import { View, Text, StyleSheet, Image, Input, Icon, Button } from 'react-native';
import { createAppContainer, SafeAreaView } from 'react-navigation';

class HomeScreen extends React.Component {

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
  
  
    render() {
      return (
        <SafeAreaView style={styles.viewStyles}>
          <Text>Home Screen</Text>
        </SafeAreaView>
      );
    }
  }
  
  
  export default HomeScreen;
  
  
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
  