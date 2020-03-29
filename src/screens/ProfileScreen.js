import React from 'react';
import { View, StyleSheet, Button, BackHandler, TextInput } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import QueryHandler from '../api/QueryHandler';
import { connect } from 'react-redux';

class ProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: "Profile",
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
            mubc: "0",
            mintTo:"",
            amount: ""
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

    logout = async () => {
        this.props.navigation.navigate('Login');
    }

    mintTo = async () => {
        let toast = Toast.show('Minting Tokens to User...', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });
        var res = await QueryHandler.mintToUser(this.state.mintTo, this.state.amount, this.props.uniqueID);
        console.log(res);
        if (res) {
            let toast = Toast.show('Minted Tokens To User!', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0
            });
        } else {
            let toast = Toast.show('Could Not Mint To User!', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0
            });
        }
    }


    render() {
        return (
            <SafeAreaView style={styles.viewStyles}>

                <Button
                    onPress={this.logout}
                    title="Logout"
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Mint To User Id"
                    onChangeText={(value) => this.setState({ mintTo: value })}
                    value={this.state.mintTo}
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Amount"
                    onChangeText={(value) => this.setState({ amount: value })}
                    value={this.state.amount}
                />

                <Button
                    onPress={this.mintTo}
                    title="Mint"
                />
            </SafeAreaView>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        uniqueID: state.userReducer.uniqueID
    }
}

const mapDispatchToProps = (dispatch) => {
    return { }
}


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ProfileScreen));


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