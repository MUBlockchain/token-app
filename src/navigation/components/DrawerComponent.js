import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Image } from 'react-native-elements';
import { DrawerItems } from 'react-navigation-drawer';


class DrawerComponent extends React.Component {
    openProfile = () => {
        //this.props.navigation.navigate('Profile');
        this.props.navigation.closeDrawer();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../../images/logo.png')} style={styles.profilePic} />
                    <Text style={styles.name}>Peter Cooke</Text>
                    <Text style={styles.balance}>MUBC Token's: 5</Text>
                </View>
                <View style={styles.mainContainer}>
                    <DrawerItems {...this.props} />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Miami University Blockchain Club</Text>
                </View>
            </SafeAreaView>
        );
    }
}

export default DrawerComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop:20
    },
    profilePic: {
        padding:10,
        height: 90,
        width: 90,
    },
    name: {
        textAlign:'center',
        marginTop: 20,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    balance: {
        textAlign:'center',
        color: 'grey',
        fontSize: 15
    },
    mainContainer: {
        borderTopColor: '#888',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#888',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    footer: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'flex-end'
    },
    footerText: {
        marginBottom: 30,
        marginLeft: 30
    }
});