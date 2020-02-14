import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image, PricingCard } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

class RewardProductComponent extends React.Component {
    render() {
        return (
            <PricingCard
                color="#C3142D"
                title="T-Shirt"
                price="20 Tokens"
                button={{ title: 'Purchase', icon: 'account-balance' }}
                pricingStyle={{fontSize:18}}
                containerStyle={{paddingVertical:15, paddingHorizontal:20, borderRadius: 10}}
            />
        );
    }
}

export default RewardProductComponent;

