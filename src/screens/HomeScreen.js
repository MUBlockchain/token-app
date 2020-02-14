import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import QueryHandler from '../api/QueryHandler';

class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: "Home",
            headerLeft: () =>
                <View style={{ marginLeft: 10 }}>
                    <Icon 
                        name="menu"
                        onPress={() => navigation.toggleDrawer()}
                        color="#000000" 
                    />
                </View>,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
          uid: "",
          mubc: "0"
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

    getBalance = async () =>{
      const r = await QueryHandler.getMUBCTokenBalance(this.state.uid);
      this.setState({mubc: r.data.balance});
    }
  
  
    render() {
      return (
        <SafeAreaView style={styles.viewStyles}>
          <Text>Balance: </Text>
          <Text>{this.state.mubc}</Text>

          <TextInput
            style={{height: 40}}
            placeholder="Enter UUID"
            onChangeText={(value) => this.setState({uid: value})}
            value={this.state.uid}
          />

          <Button
            onPress={this.getBalance}
            title="Get Balance"
          />
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
  