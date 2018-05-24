import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { observer } from "mobx-react";
import MobxReactForm from 'mobx-react-form';
import validator from 'validator';
const plugins = { vjf: validator };
import MCFormInput from '../component/DataEntry/MCFormInput';
import { isEmail } from '../utils/validator-helper';

// 作为测试使用的，暂时不用管


const fields = [{
    name: 'email',
    label: '邮箱',
    placeholder: '请输入你的邮箱',
    validators: [isEmail],
}, {
    name: 'password',
    label: '密码',
    placeholder: '请输入你的密码',
}, {
    name: 'passwordConfirm',
    label: '确认密码',
    placeholder: '请再次输入你的密码',
    // =t4
}];

const hooks = {
    onSuccess(form) {
        alert('Form is valid! Send the request here.');
        // get field values
        console.log('Form Values!', form.values());
    },
    onError(form) {
        alert('Form has errors!');
        // get all form errors
        console.log('All form errors', form.errors());
    }
}

export default observer(({ form }) => {
    console.log('halo', form.$('email').value.length)
    return (
        <View>
            <MCFormInput field={form.$('email')} value={form.$('email').value} errMsg={'请输入正确的邮箱'} />
            <MCFormInput field={form.$('password')} value={form.$('password').value} errMsg={'请输入正确的邮箱'} />
            <MCFormInput field={form.$('passwordConfirm')} value={form.$('passwordConfirm').value} errMsg={'请输入正确的邮箱'} />
            <Text>{form.error}</Text>
            <TouchableOpacity onPress={form.onSubmit}>
                <Text>提交</Text>
            </TouchableOpacity>
        </View>
    )
});


export const form = new MobxReactForm({ fields }, { plugins, hooks });
