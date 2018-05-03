import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, NetInfo } from "react-native";
import { observer } from "mobx-react";
import MobxReactForm from 'mobx-react-form';
import validator from 'validator';
const plugins = { vjf: validator };
import MCFormInput from '../../../component/DataEntry/MCFormInput';
import MCButton from '../../../component/DataEntry/MCButton';
import { isEmail, isPhone, isPassword } from '../../../utils/validator-helper';
import { THEME_PRIMARY_COLOR } from '../../../common-style/theme';
import { Toast } from 'antd-mobile';

const PIXEL_RATE = Dimensions.get('screen').width / 375;

const fields = [{
    name: 'phone',
    label: '手机号码',
    placeholder: '请输入您的手机号码',
    validators: [isPhone],
}, {
    name: 'password',
    label: '密码',
    placeholder: '设置密码（6-16位）',
    validators: [isPassword],
}];

// const hooks = {
//     onSuccess(form) {
//         NetInfo.fetch().done((reach) => {
//                alert(reach);
//         })
//     },
//     onError(form) {
//         alert('Form has errors!');
//         // get all form errors
//         console.log('All form errors', form.errors());
//     }
// }

export default observer(({ form }) => {
    let clickable = form.$('phone').value.length && form.$('password').value.length;
    let refArray = [];
    function addTextInputRef(ref) {
        refArray.push(ref);
    }
    function fireInputBlur() {
        refArray.forEach((item) => {
            if (item !== null) {
                item.blur();
            }
        })
    }
    return (
        <TouchableOpacity 
            onPress={() => fireInputBlur()} 
            activeOpacity={1}
            style={{ flex: 1, width: Dimensions.get('screen').width, alignItems: 'center'}}
        >
            <MCFormInput field={form.$('phone')} addTextInputRef={addTextInputRef} />
            <MCFormInput field={form.$('password')} addTextInputRef={addTextInputRef} />
            <MCButton
                    width={248 * PIXEL_RATE}
                    height={53 * PIXEL_RATE}
                    color="#FFF"
                    mainColor={THEME_PRIMARY_COLOR}
                    handler={form.onSubmit}
                    clickable={clickable}
            >下一步</MCButton>
        </TouchableOpacity>
    )
});


export const form = new MobxReactForm({ fields }, { plugins });

