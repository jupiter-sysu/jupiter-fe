import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput, Dimensions } from 'react-native';
import { observer } from 'mobx-react';
import { THEME_ERROR_COLOR } from '../../common-style/theme';

// 表单输入框
// =========
// porps说明
// >width:Number,宽度
// >height:Number,高度
// >field:Object,表单项
const PIXEL_RATE = Dimensions.get('screen').width / 375;

function getKeyboardType(label) {
    if (label.indexOf('手机') !== -1) {
        return 'phone-pad';
    } 
    if (label.indexOf('密码') !== -1) {
        return 'default';
    } 
    return 'default';
}

function getSecure(label) {
    if (label.indexOf('密码') !== -1) {
        return true;
    }
    return false;
}

@observer
class MCFormInput extends Component {

    render() {
        const { width = 253 * PIXEL_RATE, height = 40 * PIXEL_RATE, field, type = 'text', placeholder = null, addTextInputRef } = this.props;
        return (
            <View style={{ marginBottom: 20 * PIXEL_RATE }}>
                <Text style={{ color: '#797979', backgroundColor: 'rgba(0,0,0,0)' }}>{field.label}</Text>
                <TextInput
                    {...field.bind()}
                    ref={(ref) => addTextInputRef(ref)}
                    clearButtonMode="while-editing"
                    keyboardType={getKeyboardType(field.label)}
                    secureTextEntry={getSecure(field.label)}
                    value={field.value}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => field.set(text)}
                    style={{ borderBottomWidth: 1, fontSize: 18 * PIXEL_RATE, color: '#000', borderColor: field.error === null ? '#B8B8B8' : THEME_ERROR_COLOR, width: width, height: height }}
                // onChange={(e) => {field.onChange(e);console.log(field.value)}}
                >
                </TextInput>
                {field.error === null ? null : <Text style={{ backgroundColor: 'rgba(0,0,0,0)', marginTop: 8 * PIXEL_RATE, marginBottom: 8 * PIXEL_RATE, color: THEME_ERROR_COLOR }}>{field.error}</Text>}
            </View>
        )
    }
}

export default MCFormInput;
