import React from 'react';
import { BackHandler } from 'react-native';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import RewardProductComponent from '../components/RewardProductComponent';
import { connect } from 'react-redux';
import { getItems } from '../redux/actions/itemActions'
import { getUserProfile } from '../redux/actions/userActions';

class RewardsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            msg: "Error",
            pItems: [],
            npItems: []
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
        await this.fillItemArrays();
        // console.log("RewardsScreen: " + this.props.)
        await this.props.getUserProfile(this.props.uniqueID);
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
        this.fillItemArrays();
        await this.props.getUserProfile(this.props.uniqueID);
        this.setState({ refreshing: false });
    }

    fillItemArrays = async () => {
        var pItems = [];
        var npItems = [];
        
        await this.props.getItems();

        this.props.items.forEach(item => {
            if (item.purchasers.includes(this.props.userId)) {
                pItems.push(item);
            } else {
                npItems.push(item);
            }
        });
        
        console.log(pItems);

        this.setState({
            pItems: pItems,
            npItems: npItems
        });

    }

    renderItemComponents = () => {
        console.log(this.props.userId);

        var rendernpItems = this.state.npItems.length > 0;
        var renderpItems = this.state.pItems.length > 0;

        return (
            <View>
                {rendernpItems ? this.renderItems(this.state.npItems, "Not Purchased Items") : null}
                {renderpItems ? this.renderItems(this.state.pItems, "Purchased Items") : null}
            </View>
        );
    }

    renderItems = (items, status) => {
        return (
            <View style={[styles.roleSection]}>
                <Text style={styles.roleText}>
                    {status}
                </Text>
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
            />;
        });
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
        error: state.itemReducer.error,
        placeholder: state.itemReducer.placeholder,
        timeoutOccurred: state.itemReducer.timeoutOccurred,
        userId: state.userReducer.uuid,
        uniqueID: state.userReducer.uniqueID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: () => dispatch(getItems()),
        getUserProfile: (uuid) => dispatch(getUserProfile(uuid))
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

});

