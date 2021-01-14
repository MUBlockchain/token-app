import React from 'react';
import { BackHandler } from 'react-native';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import RewardProductComponent from '../components/RewardProductComponent';
import { connect } from 'react-redux';
import { getItems } from '../redux/actions/itemActions'
import { getUserProfile } from '../redux/actions/userActions';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

class RewardsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            msg: "Error",
            pItems: [],
            npItems: [],
            index: 0,
            routes: [
                { key: 'first', title: 'Available' },
                { key: 'second', title: 'Purchased' }
            ]
        };
    }

    handleIndexChange = (index) => {
        this.setState({
            index
        })
    }

    renderTabBar = (props) => {
        return (
            <TabBar
                {...props}
                indicatorStyle={styles.indicator}
                style={styles.tabbar}
                tabStyle={styles.tab}
                labelStyle={styles.label}
            />
        )
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Rewards",
            headerLeft: () =>
                <View style={{ marginLeft: 10 }}>
                    <Icon
                        name="menu"
                        onPress={() => navigation.toggleDrawer()}
                        color="#000000"
                    />
                </View>
        };
    };

    async componentDidMount() {
        await this.props.getItems(this.props.token, this.props.userId);
        //await this.props.getUserProfile(this.props.uniqueID);
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
        await this.props.getItems(this.props.token, this.props.userId);
        //await this.props.getUserProfile(this.props.uniqueID);
        this.setState({ refreshing: false });
    }

    renderItems = (items) => {
        return (
            <View style={[styles.roleSection]}>
                {this.renderItemsHelper(items)}
            </View>
        );
    }

    renderItemsHelper = (items) => {
        return items.map((item, i) => {
            return <RewardProductComponent
                key={i}
                title={item.description}
                price={item.cost}
                pic=""
                serial={item.serial}
                uniqueID={this.props.uniqueID}
                token={this.props.token}
                navigation={this.props.navigation}
            />;
        });
    }

    availableRewards = () => {
        return (
            <View style={styles.gridContainer}>
                <ScrollView contentContainerStyle={[styles.gridContainer, styles.extraSpacing]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                    <View>
                        {this.renderItems(this.props.npItems)}
                    </View>
                </ScrollView>
            </View>
        );
    }

    purchasedRewards = () => {
        return (
            <View style={styles.gridContainer}>
                <ScrollView contentContainerStyle={[styles.gridContainer, styles.extraSpacing]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                    <View>
                        {this.renderItems(this.props.pItems)}
                    </View>
                </ScrollView>
            </View>
        );
    }

    render() {

        if (this.timeoutOccurred) { ErrorHandler.connectionError(); }
        // console.log("ITEMS Error: " + this.props.items.error)

        if (this.props.items.length === 0) {
            if (this.props.isLoading && !this.state.refreshing) {
                return (
                    <SafeAreaView style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#C3142D" />
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
                            {this.props.error}
                        </Text>
                    </ScrollView>
                </SafeAreaView>
            );
        } else {
            return (
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: this.availableRewards,
                        second: this.purchasedRewards,
                    })}
                    onIndexChange={this.handleIndexChange}
                    renderTabBar={this.renderTabBar}
                />
            )
        }

    }
}


const mapStateToProps = (state) => {
    return {
        isLoading: state.itemReducer.isLoading,
        items: state.itemReducer.items,
        errorBack: state.itemReducer.errorBack,
        error: state.itemReducer.error,
        placeholder: state.itemReducer.placeholder,
        timeoutOccurred: state.itemReducer.timeoutOccurred,
        npItems: state.itemReducer.npItems,
        pItems: state.itemReducer.pItems,
        userId: state.userReducer.uuid,
        uniqueID: state.userReducer.uniqueID,
        token: state.userReducer.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: (token, userId) => dispatch(getItems(token, userId)),
        getUserProfile: (uuid, token) => dispatch(getUserProfile(uuid, token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(RewardsScreen));


const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
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
    roleSection: {
        flex: 1,
        alignItems: "center",
    },
    roleText: {
        fontSize: 20,
        color: "#000000",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5
    },
    tabbar: {
        backgroundColor: '#FFFFFF',
    },
    tab: {
        alignItems: 'center'
    },
    indicator: {
        backgroundColor: 'red',
    },
    label: {
        fontWeight: '600',
        color: 'black'
    },

});

