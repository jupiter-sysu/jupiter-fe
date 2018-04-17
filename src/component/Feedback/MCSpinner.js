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
            <View style={styles.modalContaienr}>
                <Bars size={30} color={THEME_PRIMARY_COLOR} />
            </View>
        </Modal>

    )
}

export default MCHeader;

const styles = StyleSheet.create({
    modalContaienr: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

});



