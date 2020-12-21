import React from 'react';
import { BackHandler } from 'react-native';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Text } from 'react-native';
import { connect } from 'react-redux';

class RewardsOverviewScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Reward Overview"
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            code:"",
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        console.log('TEST: ' + JSON.stringify(this.props))
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
                <Text>{this.props.navigation.state.params.title}</Text>
                <Text>{this.props.navigation.state.params.price}</Text>
            </SafeAreaView>
        );
    }
}

export default connect(null, null)(RewardsOverviewScreen);


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
