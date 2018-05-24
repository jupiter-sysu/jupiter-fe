import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Dimensions, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;
// 注册/登录页头部
// =============
// porps说明
// title:String,头部标题
// >handler:Function,事件处理器


function MCHeader(props) {
    const { handler, children="" } = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handler}
                style={styles.backIcon}
            >
                <Ionicons name='ios-arrow-back' size={30 * PIXEL_RATE} style={{marginTop: 2, color: 'black', backgroundColor: 'rgba(0,0,0,0)'}} />  
            </TouchableOpacity>
            <Text style={{ color: 'black', backgroundColor: 'rgba(1,1,1,0)',  fontWeight: 'normal', fontSize: 20 * PIXEL_RATE, textAlign: 'center', lineHeight: 32 * PIXEL_RATE }}>{children}</Text>
        </View>
           
    )
}

export default MCHeader;

const styles = StyleSheet.create({
    container: {
        height: 32 * PIXEL_RATE,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'red',
        position: 'absolute',
        top: 28 * PIXEL_RATE_Y,
    },
    backIcon: {
        position: 'absolute',
        left: 16 * PIXEL_RATE,
        width: 40 * PIXEL_RATE,
        alignItems: 'center',
        height: 30 * PIXEL_RATE,
    }

});


