import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PricingCard } from 'react-native-elements';
import QueryHandler from '../api/QueryHandler';
import Toast from 'react-native-root-toast';

class RewardProductComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            visible: false
        };
    }
    purchaseItem = async () => {
        console.log("Item Serial: " + this.props.serial);
        // Add a Toast on screen.

        var res = await QueryHandler.purchaseItem(this.props.serial, this.props.uniqueID, this.props.token);
    }

    render() {
        return (
            <PricingCard
                color="#C3142D"
                title={this.props.title}
                price={this.props.price + " Tokens"}
                button={{ title: 'Purchase', icon: 'account-balance' }}
                pricingStyle={{ fontSize: 16 }}
                containerStyle={{ paddingVertical: 15, paddingHorizontal: 20, borderRadius: 10 }}
                onButtonPress={this.purchaseItem}
            />
        );
    }
}

export default RewardProductComponent;

