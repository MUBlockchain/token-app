import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PricingCard } from 'react-native-elements';

class RewardProductComponent extends React.Component {
    render() {
        return (
            <PricingCard
                color="#C3142D"
                title={this.props.title}
                price={this.props.price + " Tokens"}
                button={{ title: 'Purchase', icon: 'account-balance' }}
                pricingStyle={{fontSize:16}}
                containerStyle={{paddingVertical:15, paddingHorizontal:20, borderRadius: 10}}
            />
        );
    }
}

export default RewardProductComponent;

