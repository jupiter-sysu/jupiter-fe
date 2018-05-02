import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, NetInfo } from 'react-native';
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import validator from 'validator';
const plugins = { vjf: validator };
import MCFormInput from '../../../component/DataEntry/MCFormInput';
import MCButton from '../../../component/DataEntry/MCButton';
import { isPhone } from '../../../utils/validator-helper';
import { THEME_PRIMARY_COLOR, THEME_ERROR_COLOR } from '../../../common-style/theme';
import { Toast } from 'antd-mobile';

const PIXEL_RATE = Dimensions.get('screen').width / 375;

const fields = [{
    name: 'phone',
    label: '手机号码',
    placeholder: '请输入您的手机号码',
    validators: [isPhone],
}];

export default observer(({ form }) => {
    let clickable = form.$('phone').value.length;
    let refArray = [];
    function addTextInputRef(ref) {
        refArray.push(ref);
    }
    function fireInputBlur() {
        refArray.forEach( (item) => {
            if (item != null) {
                item.blur();
            }
        });
    }

    return (
        <TouchableOpacity
            opPress={ () => fireInputBlur()}
            activeOpacity={1}
            style={{ flex: 1, width: Dimensions.get('screen').width, alignItems: 'center',}}
        >
            <MCFormInput field={form.$('phone')} addTextInputRef={addTextInputRef} />
            <MCButton
                width={248 * PIXEL_RATE}
                height={53 * PIXEL_RATE}
                color="#FFF"
                mainColor={THEME_PRIMARY_COLOR}
                handler={form.onSubmit}
                clickable={clickable}
            >发送验证码</MCButton>
        </TouchableOpacity>
    );
});

export const form = new MobxReactForm({ fields }, { plugins });