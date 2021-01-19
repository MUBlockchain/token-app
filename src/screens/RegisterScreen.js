import React from 'react';
import { BackHandler } from 'react-native';
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import QueryHandler from '../api/QueryHandler';

class RegisterScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Register'
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            twitterName: "",
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
        console.log(this.state.twitterName)
        let ret = await QueryHandler.getTwitterId(this.state.twitterName)
        console.log('RET: ', ret)
        // await this.props.userContract.enroll(this.props.name, twitterid, this.props.image)
        // this.props.navigation.navigate('RegisterUser')
    }


    render() {
        return (
            <SafeAreaView style={styles.viewStyles}>
                <Text style={styles.descriptionText}> Register User </Text>
                <View style={styles.inputRow}>
                    <Text>Name: </Text>
                    <TextInput
                        editable={false}
                        value={this.props.name}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Text>Twitter Username: </Text>
                    <TextInput
                        style={styles.twitterHandle}
                        onChangeText={(value) => this.setState({ twitterName: value })}
                        placeholder=""
                        value={this.state.twitter}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Text>Image URL: </Text>
                    <TextInput
                        editable={false}
                        value={`${this.props.image.substring(0, 16)}...`}
                    />
                </View>
                <TouchableHighlight
                    style={styles.registerButton}
                    onPress={this.register}
                    underlayColor='#fff'>
                    <Text style={[24, styles.signInText]}>Register</Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.userReducer.name,
        image: state.userReducer.profilePic,
        userContact: state.contractReducer.userContract
    }
}

export default connect(mapStateToProps)(withNavigation(RegisterScreen));


const styles = StyleSheet.create({
    inputRow: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    twitterHandle: {
        height: 30,
        width: 110,
        backgroundColor: 'lightgray',
        borderRadius: 999,
        padding: 8
    },
    descriptionText: {
        fontSize: 25,
        marginBottom: 20
    },
    registerButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 25,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: '#C9102E',
        borderRadius: 40,
        borderWidth: 0,
        borderColor: '#fff'
    },
    signInText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
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
        fontSize: 50,
        fontWeight: 'bold'
    }
});
