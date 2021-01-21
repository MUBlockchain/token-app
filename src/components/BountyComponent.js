import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { selectBounty } from '../redux/actions/bountyActions';

class BountyComponent extends React.Component {

    openBounty = () => {
        //Might need to add a select reward to props
        this.props.selectBounty(this.props.bountyIndex);

        console.log("OPEN Bounty:", this.props)

        this.props.navigation.navigate('BountiesOverview',{
            title: this.props.title,
            description: this.props.description,
            imageUrl: this.props.imageUrl,
            awards: this.props.awards,
            infinite: this.props.infinite,
            quantity: this.props.quantity,
            active: this.props.active,
            bountyIndex: this.props.bountyIndex,
            isOwned: this.props.isOwned
        });
    }


    render() {
        return (
            <SafeAreaView style={styles.outerContainer}>
                <TouchableOpacity onPress={this.openBounty}>
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
        selectBounty: (bountyIndex) => dispatch(selectBounty(bountyIndex))
    }
}

export default connect(null, mapDispatchToProps) (BountyComponent);

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

