import React from 'react';
import { View, StyleSheet, Button, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';

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

    logout = async () => {
        this.props.navigation.navigate('Login');
    }


    render() {
        return (
            <SafeAreaView style={styles.viewStyles}>

                <Button
                    onPress={this.logout}
                    title="Logout"
                />
            </SafeAreaView>
        );
    }
}


export default ProfileScreen;


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