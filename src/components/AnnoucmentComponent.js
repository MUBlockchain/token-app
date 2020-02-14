import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

class AnnouncementComponent extends React.Component {

    render() {
        return (
            <SafeAreaView style={styles.outerContainer}>
                <View style={styles.innerContainer}>
                    <View style={[styles.row, styles.rowLimitHeight]}>
                        <View style={styles.subRowStart}>
                            <Image source={require('../images/logo.png')} style={styles.profPic} />
                            <View style={styles.info}>
                                <Text style={styles.textEmphasis}>Jack Gilcrest</Text>
                            </View>
                        </View>
                        <View style={styles.subRowEnd}>
                            <View style={styles.date}>
                                <Text style={styles.dateText}>1 min ago</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentText}>
                            We will have a club meeting at 6:30PM today in Farmer 200!
                            </Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default AnnouncementComponent;

const styles = StyleSheet.create({
    outerContainer: {
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 18,
        backgroundColor: '#FFFFFF',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 1.0,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 10
    },
    innerContainer: {
        padding: 10,
        flex: 0
    },
    rowFlex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowLimitHeight: {
        height: 40
    },
    rowMarginTop: {
        marginTop: 17
    },
    rowMarginTopLight: {
        marginTop: 10
    },
    subRowStart: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    subRowEnd: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    textEmphasis: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold'
    },
    profPic: {
        height: 35,
        width: 35,
        borderRadius: 17.5,
        marginLeft: 10
    },
    info: {
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        height: "100%"
    },
    date: {
        height: "100%",
        marginRight: 10,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    dateText: {
        fontSize: 14
    },
    content: {
        marginTop: 10,
        marginHorizontal: 10,
    },
    contentText: {
        fontSize: 14,
        color: 'black'
    },
    likesInfoContainer: {
        marginLeft: 10,
        alignItems: "center"
    },
    likesInfoTextContainer: {
        marginLeft: 3
    },
    dislikeInfoIconContainerStyle: {
        marginLeft: 10
    },
    commentsInfo: {
        marginRight: 10,
    },
    hairline: {
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: '#bbb',
        height: 1
    },
    actionContainer: {
        marginLeft: 5
    },
    actionText: {
        fontSize: 16,
        fontWeight: '400'
    },
    condense: {
        marginHorizontal: 20,
        marginBottom: 5
    }
});
