import React from 'react';
import { BackHandler } from 'react-native';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, RefreshControl } from 'react-native';
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
        console.log("Component Did Mount");
        // This is how you handle auto api call on navigation to a screen
        this.focusListener = await this.props.navigation.addListener("didFocus", async () => {
            console.log("Getting Items...");
            this.props.getItems();
        });

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.focusListener.remove();
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


    renderItemComponents = () => {
        console.log("rednerItemComponetns...")
        console.log(JSON.stringify(this.props.items));

        return this.props.items.map((item, i) => {
            return <RewardProductComponent
                key={i}
                title={item.description}
                price={item.cost}
                pic=""
            />;
        });

    }


    render() {

        if (this.timeoutOccurred) { ErrorHandler.connectionError(); }
        //console.log("ITEMS" + this.props.items)
        
        if (this.props.items.length === 0) {
            if (this.props.isLoading && !this.state.refreshing) {
                return (
                    <SafeAreaView style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#86DDF9" />
                    </SafeAreaView>
                );
            }
            return (
                <SafeAreaView style={styles.emptyContainer}>
                    <ScrollView
                        contentContainerStyle={styles.emptyContainer}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }>
                        <Text style={styles.text}>
                            {this.props.placeholder}
                        </Text>
                    </ScrollView>
                </SafeAreaView>
            );
        } else {
            return (
                <SafeAreaView style={styles.groupContainer}>
                    <View style={styles.gridContainer}>
                        <ScrollView contentContainerStyle={[styles.gridContainer, styles.extraSpacing]}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }>
                            {this.renderItemComponents()}
                        </ScrollView>
                    </View>
                </SafeAreaView>
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
    emptyContainer: {
        justifyContent: "center",
        flex: 1,
        padding: 35
    },
    text: {
        textAlign: "center"
    },
    groupContainer: {
        backgroundColor: "#F5F5F5",
        flex: 1
    },
    scrollViewContainer: {
        flex: 1
    },
    gridContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    extraSpacing: {
        paddingTop: 5,
        paddingBottom: 20
    },
});

