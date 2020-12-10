import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer';
import { connect } from 'react-redux';


class DrawerComponent extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image source={{uri: this.props.profilePic}} style={styles.profilePic} />
                    <Text style={styles.name}>{this.props.name}</Text>
                    <Text style={styles.balance}>MUBC Token's: {this.props.balance}</Text>
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

const mapStateToProps = (state) => {
    return {
        name: state.userReducer.name,
        balance: state.userReducer.balance,
        profilePic: state.userReducer.profilePic
    }
}

export default connect(mapStateToProps, null)(withNavigation(DrawerComponent));


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
