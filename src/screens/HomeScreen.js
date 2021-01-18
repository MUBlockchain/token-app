import React from 'react';
import { View, Text, StyleSheet, BackHandler, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView, withNavigation} from 'react-navigation';
import { Icon } from 'react-native-elements';
import GroupAnnouncementComponent from '../components/AnnoucmentComponent';
import { connect } from 'react-redux';
import { getAnnouncements } from '../redux/actions/announcementActions'

class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: "Home",
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

    constructor(props) {
        super(props);
        this.state = {
            uid: "",
            mubc: "0",
            refreshing: false
        };
    }

    async componentDidMount() {
        // @dev TODO
        //await this.props.getAnnouncements(this.props.wallet);
        console.log('DONE COMPONENT DID MOUNT')
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.navigation.goBack();
        return true;
    }

    renderAnnouncementsComponent = () => {
        console.log("renderAnnouncementsComponent...:", this.props.annoucements)
        //this.props.annoucementContract.reverse();
        return this.props.announcements.map((announcement, i) => {
            return <GroupAnnouncementComponent
                key={i}
                //author={announcement.author}
                //date={annoucement.onCreated}
                message={announcement.body}
                title={announcement.title}
            />
        });
    }

    async _onRefresh () {
        console.log(this.props.isLoading)
        this.setState({refreshing: true})
        //await this.props.getAnnouncements(this.props.wallet);
        this.setState({refreshing: false})
    }


    render() {
        console.log('HomeScreen Render')
        if (this.timeoutOccurred) { ErrorHandler.connectionError(); }
        // console.log("Announcements Error: " + this.props.error)
        
        if (this.props.announcements.length === 0) {
            if (this.props.isLoading && this.state.refreshing) {
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
                    <View style={styles.scrollViewContainer}>
                        <ScrollView contentContainerStyle={[styles.gridContainer, styles.extraSpacing]}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }>
                            {this.renderAnnouncementsComponent()}
                        </ScrollView>
                    </View>
                </SafeAreaView>
            );
        }
    }
}


const mapStateToProps = (state) => {
    return {
        isLoading: state.announcementReducer.isLoading,
        errorBack: state.announcementReducer.errorBack,
        error: state.announcementReducer.error,
        timeoutOccurred: state.announcementReducer.timeoutOccurred,
        token: state.userReducer.token,
        privateKey: state.userReducer.privateKey,
        wallet: state.userReducer.wallet,
        announcements: state.announcementReducer.announcements
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAnnouncements: (wallet) => dispatch(getAnnouncements(wallet))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(HomeScreen));


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
