import React from 'react';
import { BackHandler } from 'react-native';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

class RegisterScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitleStyle: { alignSelf: 'center' },
            title: "Register",
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            twitterid:"",
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

    register = async () => {

    }


    render() {
        return (
            <SafeAreaView style={styles.viewStyles}>
                <Text>Name: </Text>
                <TextInput
                    style={{ height: 40 }}
                    onChangeText={(value) => this.setState({ code: value })}
                    editable={false}
                    value={this.props.name}
                />
                <TextInput
                    style={styles.tw}
                    onChangeText={(value) => this.setState({ code: value })}
                    placeholder="Twitter Handle"
                    value={this.state.twitter}
                />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.userReducer.name,
    }
}

export default connect(mapStateToProps)(withNavigation(RegisterScreen));


const styles = StyleSheet.create({
    twitterHandle: {
        height: 40,
        width: 100,
    },
    logo: {
        width: 250,
        height: 250
    },
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
        backgroundColor: 'white'
    },
    textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    }
});
