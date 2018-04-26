import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { THEME_PRIMARY_COLOR } from './../../common-style/theme';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

// 菊花图
// =============
// porps说明
// >isVisible:boolean,是否显示


function MCHeader(props) {
    const { isVisible } = props;
    return (
        <Modal
            animationType={"none"}
            transparent={true}
            visible={isVisible}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalSmallContainer}>
                    <Bars size={18} color={THEME_PRIMARY_COLOR} />
                </View>
            </View>
        </Modal>

    )
}

export default MCHeader;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalSmallContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    }
    

});



