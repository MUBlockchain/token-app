import React from 'react';
import { BackHandler } from 'react-native';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';

class RedeemScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: "Redeem Code",
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
            code:"",
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


    render() {
        return (
            <SafeAreaView style={styles.viewStyles}>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Enter Code"
                    onChangeText={(value) => this.setState({ code: value })}
                    value={this.state.code}
                />

                <Button
                    onPress={this.getBalance}
                    title="Redeem Code"
                />
            </SafeAreaView>
        );
    }
}


export default RedeemScreen;


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
