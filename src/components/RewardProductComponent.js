import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PricingCard } from 'react-native-elements';
import QueryHandler from '../api/QueryHandler';
import { Image } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { selectReward } from '../redux/actions/itemActions';

class RewardProductComponent extends React.Component {
    
    purchaseItem = async () => {
        console.log("Item Serial: " + this.props.serial);
        // Add a Toast on screen.

        var res = await QueryHandler.purchaseItem(this.props.serial, this.props.uniqueID, this.props.token);
    }

    openReward = () => {
        //Might need to add a select reward to props
        //this.props.selectReward(this.props.key, this.props.title, this.props.itemPic, this.props.price);
        
        this.props.navigation.navigate('RewardsOverview',{
            title: this.props.title,
            price: this.props.price,
            pic: this.props.pic
        });
    }


    render() {
        return (
            <SafeAreaView style={styles.outerContainer}>
                <TouchableOpacity onPress={this.openReward}>
                    <View style={styles.innerContainer}>
                        <View style={styles.columnFlex}>
                            <Image source={require('../images/logo.png')} style={styles.itemPic} />
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {this.props.title}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedItem: state.itemReducer.selectedItem
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectReward: (rewardId) => dispatch(selectReward(rewardId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (RewardProductComponent);

const styles = StyleSheet.create({
    outerContainer: {
        padding: 10,
        marginVertical: 15,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 1.0,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 7.5,
        width: 380,
    },
    innerContainer: {
        padding: 10,
        flex: 0
    },
    columnFlex: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    itemPic: {
        height: 250,
        width: 300,
        borderRadius: 5,
        alignItems: 'center'
    },
    info: {
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        height: "100%"
    },
    dateText: {
        fontSize: 14
    },
    content: {
        marginTop: 20,
        marginHorizontal: 10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    contentText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    }
});

