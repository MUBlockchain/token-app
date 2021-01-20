import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { selectReward } from '../redux/actions/itemActions';

class RewardProductComponent extends React.Component {

    openReward = () => {
        //Might need to add a select reward to props
        this.props.selectReward(this.props.itemIndex);

        console.log("OPEN REWARD:", this.props)

        this.props.navigation.navigate('RewardsOverview',{
            title: this.props.title,
            description: this.props.description,
            imageUrl: this.props.imageUrl,
            cost: this.props.cost,
            infinite: this.props.infinite,
            quantity: this.props.quantity,
            active: this.props.active,
            itemIndex: this.props.itemIndex,
            isOwned: this.props.isOwned
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


const mapDispatchToProps = (dispatch) => {
    return {
        selectReward: (itemIndex) => dispatch(selectReward(itemIndex))
    }
}

export default connect(null, mapDispatchToProps) (RewardProductComponent);

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

