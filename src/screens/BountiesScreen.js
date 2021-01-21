import React from 'react';
import { BackHandler } from 'react-native';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getBounties } from '../redux/actions/bountyActions'
import { getUserProfile } from '../redux/actions/userActions';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import BountyComponent from '../components/BountyComponent';

class BountiesScreen extends React.Component {
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
                { key: 'second', title: 'Pending' },
                { key: 'third', title: 'Awarded' },
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
            title: "Bounties",
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
        await this.props.getBounties(this.props.wallet, this.props.bounties);
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
        //await this.props.getBounties(this.props.wallet, this.props.purchasedBounties);
        this.setState({ refreshing: false });
    }

    renderBounties = (bounties) => {
        return (
            <View style={[styles.roleSection]}>
                {this.renderBountiesHelper(bounties)}
            </View>
        );
    }

    renderBountiesHelper = (bounties) => {
        console.log('renderBountiesHelper: ', bounties)
        return bounties.map((bounty, i) => {
            return <BountyComponent
                key={i}
                title={bounty.title}
                description={bounty.description}
                imageUrl={bounty.imageUrl}
                awards={bounty.awards}
                infinite={bounty.infinite}
                quantity={bounty.quantity}
                active={bounty.active}
                bountyIndex={bounty.bountyIndex}
                isAwarded={bounty.isAwarded}
                navigation={this.props.navigation}
            />;
        });
    }

    availableBounties = () => {
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
                        {this.renderBounties(this.props.availableBounties)}
                    </View>
                </ScrollView>
            </View>
        );
    }

    awardedBounties = () => {
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
                        {this.renderBounties(this.props.awardedBounties)}
                    </View>
                </ScrollView>
            </View>
        );
    }

    pendingBounties = () => {
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
                        {this.renderBounties(this.props.pendingBounties)}
                    </View>
                </ScrollView>
            </View>
        );
    }

    render() {
        if (this.timeoutOccurred) { ErrorHandler.connectionError(); }
        // console.log('Available Bounties: ', JSON.stringify(this.props.allBounties))
        if (this.props.allBounties.length === 0) {
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
                        first: this.availableBounties,
                        second: this.pendingBounties,
                        third: this.awardedBounties
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
        isLoading: state.bountyReducer.isLoading,
        errorBack: state.bountyReducer.errorBack,
        error: state.bountyReducer.error,
        placeholder: state.bountyReducer.placeholder,
        timeoutOccurred: state.bountyReducer.timeoutOccurred,
        pendingBounties: state.bountyReducer.pendingBounties,
        awardedBounties: state.bountyReducer.awardedBounties,
        availableBounties: state.bountyReducer.availableBounties,
        allBounties: state.bountyReducer.allBounties,
        wallet: state.userReducer.wallet
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBounties: (wallet, purchasedBounties) => dispatch(getBounties(wallet, purchasedBounties)),
        getUserProfile: (uuid, token) => dispatch(getUserProfile(uuid, token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(BountiesScreen));


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

