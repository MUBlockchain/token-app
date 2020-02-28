import React from 'react';
import { BackHandler } from 'react-native';
import { View, Text, ActivityIndicator,  StyleSheet } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import RewardProductComponent from '../components/RewardProductComponent';
import { connect } from 'react-redux';
import { getItems } from '../redux/actions/itemActions'

class RewardsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
    }


    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: "Rewards",
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

    async componentDidMount() {
        // This is how you handle auto api call on navigation to a screen
        this.focusListener = await this.props.navigation.addListener("didFocus", async () => {
            this.props.getItems();
        });

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.navigation.goBack();
        return true;
    }
    
    _onRefresh = async () => {
        this.setState({ refreshing: true });
        this.props.getItems();
        this.setState({ refreshing: false });
    }


    renderItemComponents = (itemArr) => {
        console.log("Render Item Components");
        /*
        return itemArr.map((item, i) => {
            return <GroupComponent
                key={i}
                name={group.group.name}
                description={group.group.description}
                groupID={group.group.groupID}
                pic=""
                navigation={this.props.navigation}
            />;
        });
        */
    }
    

    render() {
        
        if (this.timeoutOccurred) { ErrorHandler.connectionError(); }
        if (this.props.items.length === 0) {
            if (this.props.isLoading && !this.state.refreshing) {
                return (
                    <SafeAreaView style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#C3142D" />
                    </SafeAreaView>
                );
            }
        
            return (
                <SafeAreaView style={styles.viewStyles}>
                    <RewardProductComponent/>
                </SafeAreaView>
            );
        } else {
            return (
                <Text>Data Fetched</Text>
            );
        }
        


    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.itemReducer.isLoading,
        items: state.itemReducer.items,
        errorBack: state.itemReducer.errorBack,
        errorMsg: state.itemReducer.errorMsg,
        placeholder: state.itemReducer.placeholder,
        timeoutOccurred: state.itemReducer.timeoutOccurred
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: () => dispatch(getItems())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(RewardsScreen));


const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
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
    gridContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }

});
