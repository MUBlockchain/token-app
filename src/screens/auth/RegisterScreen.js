import React from 'react';
import { BackHandler } from 'react-native';
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import QueryHandler from '../../api/QueryHandler';

class RegisterScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitleStyle: { alignSelf: 'center' },
            title: 'Register'
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            twitterName: "",
            loading: false,
            invalid: false,
            error: false,
            errorMessage: ""
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
        this.setState({ loading: true })
        this.setState({ error: false })

        try {
            if (this.state.twitterName.indexOf('@') === -1) {
                this.setState({ invalid: true })
                this.setState({ loading: false })
            } else {
                this.setState({ invalid: false })

                const ret = await QueryHandler.getTwitterId(this.state.twitterName.substring(1))
                const twitterid = ret.data

                await this.props.userContract.enroll(this.props.name, twitterid, this.props.image)

                this.props.navigation.navigate('Drawer');
            }
        } catch (err) {
            if (err instanceof TypeError) {
                this.setState({ errorMessage: '*User does not exist. Enter valid username.' })
            } else {
                this.setState({ errorMessage: '*Some other error occurred. Try again later' })
            }
            this.setState({ error: true })
        } finally {
            this.setState({ loading: false })
        }
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
                {this.state.invalid && <Text style={styles.error}>*Input must contain "@"</Text>}
                {this.state.error && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                <View style={styles.inputRow}>
                    <Text>Image URL: </Text>
                    <TextInput
                        editable={false}
                        value={`${this.props.image.substring(0, 24)}...`}
                    />
                </View>
                <TouchableHighlight
                    style={styles.registerButton}
                    onPress={this.register}
                    underlayColor='#fff'>
                    <Text style={[28, styles.signInText]}>{!this.state.loading ? 'Register' : '...'}</Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.userReducer.name,
        image: state.userReducer.profilePic,
        userContract: state.userReducer.userContract
    }
}

export default connect(mapStateToProps)(withNavigation(RegisterScreen));


const styles = StyleSheet.create({
    inputRow: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 25
    },
    twitterHandle: {
        height: 30,
        width: 130,
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
        fontSize: 18
    },
    error: {
        color: 'red',
        fontSize: 12
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
