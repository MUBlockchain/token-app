import React from 'react';
import { BackHandler } from 'react-native';
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { purchaseItem } from '../redux/actions/itemActions';

class RewardsOverviewScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Reward Overview"
        };
    };

    constructor(props) {
        super(props);
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

    async purchase() {
        console.log('Purchasing Item: ', this.props.selectedIndex)
        await this.props.purchaseItem(this.props.selectedIndex, this.props.itemContract)
    }


    render() {
        console.log('isOwned: ', this.props.navigation.state.params.isOwned)
        if (this.props.navigation.state.params.isOwned) {
            return (
                <SafeAreaView style={styles.viewStyles}>
                    <Image source={require('../images/logo.png')} style={styles.itemPic} />
                    <Text>Title: {this.props.navigation.state.params.title}</Text>
                    <Text>Description: {this.props.navigation.state.params.description}</Text>
                    <Text>Cost: {this.props.navigation.state.params.cost}</Text>
                </SafeAreaView>
            ); 
        } else {
            return (
                <SafeAreaView style={styles.viewStyles}>
                    <Image source={require('../images/logo.png')} style={styles.itemPic} />
                    <Text>Title: {this.props.navigation.state.params.title}</Text>
                    <Text>Description: {this.props.navigation.state.params.description}</Text>
                    <Text>Cost: {this.props.navigation.state.params.cost}</Text>
                    <Text>Quantity: {this.props.navigation.state.params.quantity}</Text>
                    <TouchableHighlight
                        style={styles.signIn}
                        onPress={() => {this.purchase()}}
                        underlayColor='#fff'>
                        <Text style={[24, styles.signInText]}>Purchase Item</Text>
                    </TouchableHighlight>
                </SafeAreaView>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        selectedIndex: state.itemReducer.selectedItem,
        itemContract: state.itemReducer.itemContract
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        purchaseItem: (index, itemContract) => dispatch(purchaseItem(index, itemContract))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardsOverviewScreen);


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
    },
    signIn: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 25,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 45,
        paddingLeft: 45,
        backgroundColor: '#C9102E',
        borderRadius: 40,
        borderWidth: 0,
        borderColor: '#fff'
    },
    signInText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    }
});
