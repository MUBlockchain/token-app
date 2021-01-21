import React from 'react';
import { BackHandler } from 'react-native';
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { applyForBounty } from '../redux/actions/bountyActions';

class BountyOverviewScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Bounty Overview"
        };
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        console.log('BOUNTY OVERVIEW PROPS: ' + JSON.stringify(this.props.navigation.state.params))
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.navigation.goBack();
        return true;
    }

    async apply() {
        console.log('Apply for Bounty: ', this.props.bountyIndex)
        await this.props.applyForBounty(this.props.bountyIndex, this.props.bountyContract)
    }


    render() {
        if (this.props.navigation.state.params.isAwarded) {
            return (
                <SafeAreaView style={styles.viewStyles}>
                    <Image source={require('../images/logo.png')} style={styles.itemPic} />
                    <Text>Title: {this.props.navigation.state.params.title}</Text>
                    <Text>Description: {this.props.navigation.state.params.description}</Text>
                    <Text>Award: {this.props.navigation.state.params.awards}</Text>
                </SafeAreaView>
            ); 
        } else {
            return (
                <SafeAreaView style={styles.viewStyles}>
                    <Image source={require('../images/logo.png')} style={styles.itemPic} />
                    <Text>Title: {this.props.navigation.state.params.title}</Text>
                    <Text>Description: {this.props.navigation.state.params.description}</Text>
                    <Text>Award: {this.props.navigation.state.params.awards}</Text>
                    <Text>Quantity: {this.props.navigation.state.params.quantity}</Text>
                    <TouchableHighlight
                        style={styles.signIn}
                        onPress={() => {this.apply()}}
                        underlayColor='#fff'>
                        <Text style={[24, styles.signInText]}>Apply for Bounty</Text>
                    </TouchableHighlight>
                </SafeAreaView>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        bountyIndex: state.bountyReducer.selectedBounty,
        bountyContract: state.bountyReducer.bountyContract
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        applyForBounty: (index, bountyContract) => dispatch(applyForBounty(index, bountyContract))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BountyOverviewScreen);


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
