import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { THEME_PRIMARY_COLOR } from '../../common-style/theme';

const styles = StyleSheet.create({
    tabbar: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0,
        borderTopColor: '#CCC',
        backgroundColor: '#FFF'
    },
    tab: {
        alignSelf: 'stretch',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        marginTop: 4,
        color: '#474747',
        fontSize: 14,
    },
    addContainer: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#fdfdfd',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 1, height: 1, },
        shadowColor: 'black',
        shadowOpacity: .2,
        marginBottom: 26,
        marginLeft: 5,
        marginRight: 5 
    },
    addInsideContainer: {
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: THEME_PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

class TabBar extends Component{
    constructor(props) {
        super(props);
        this.renderTab = this.renderTab.bind(this);
    }

    renderTab(index, route, label) {
        const {
            navigation,
            renderIcon,
            activeTintColor,
            inactiveTintColor,
            jumpToIndex
        } = this.props;
        const focused = index === navigation.state.index;
        const tintColor = focused ? activeTintColor : inactiveTintColor;
        return (
            <TouchableWithoutFeedback
                style={styles.tab}
                onPress={() => jumpToIndex(index)}
            >
                <View style={styles.tab}>
                    {renderIcon({
                        route,
                        index,
                        focused,
                        tintColor
                    })}
                    <Text style={styles.label}>{label}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        const {
            navigation,
            renderIcon,
            activeTintColor,
            inactiveTintColor,
            jumpToIndex
        } = this.props;

        const {
            routes
        } = navigation.state;

        return (
            <View style={styles.tabbar}>
                {this.renderTab(0, routes[0], '体验')}
                {this.renderTab(1, routes[1], '游记')}
                <TouchableWithoutFeedback
                    style={styles.addContainer}
                    onPress={() => {console.log('hi')}}
                >
                    <View style={styles.addContainer}>
                        <View style={styles.addInsideContainer}>
                            <Ionicons name="ios-add" size={36} style={{ color: '#FFF', fontWeight: 'bold' }}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                {this.renderTab(2, routes[2], '行程')}
                {this.renderTab(3, routes[3], '我的')}
            </View>
        );
  }
};

export default TabBar;