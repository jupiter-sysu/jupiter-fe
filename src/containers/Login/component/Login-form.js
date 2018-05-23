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
import { NavigationActions } from 'react-navigation';

const PIXEL_RATE = Dimensions.get('screen').width / 375;

const fields = [{
  name: 'phone',
  label: '手机号码',
  placeholder: '请输入您的手机号码',
  validators: [isPhone],
}, {
  name: 'password',
  label: '密码',
  placeholder: '请输入密码',
}];

export default observer(({ form, naviga }) => {
  const clickable = form.$('phone').value.length && form.$('password').value.length;
  const refArray = [];
  FindPasswordPhone = () => {
    naviga.navigate('FindPasswordPhone');
  };
  function addTextInputRef(ref) {
    refArray.push(ref);
  }
  function fireInputBlur() {
    refArray.forEach((item) => {
      if (item != null) {
        item.blur();
      }
    });
  }


  return (
    <TouchableOpacity
      onPress={() => fireInputBlur()}
      activeOpacity={1}
      style={{ flex: 1, width: Dimensions.get('screen').width, alignItems: 'center' }}
    >
      <MCFormInput field={form.$('phone')} addTextInputRef={addTextInputRef} />
      <MCFormInput field={form.$('password')} addTextInputRef={addTextInputRef} />
      <View style={{ position: 'relative', left: 100 * PIXEL_RATE, bottom: 10 * PIXEL_RATE }}>
        <MCButton
          width={60 * PIXEL_RATE}
          height={22 * PIXEL_RATE}
          size={14 * PIXEL_RATE}
          mainColor="transparent"
          color="#797979"
          handler={this.FindPasswordPhone}
        >忘记密码
        </MCButton>
      </View>
      <MCButton
        width={248 * PIXEL_RATE}
        height={53 * PIXEL_RATE}
        color="#FFF"
        mainColor={THEME_PRIMARY_COLOR}
        handler={form.onSubmit}
        clickable={clickable}
      >登录
      </MCButton>

    </TouchableOpacity>
  );
});

export const form = new MobxReactForm({ fields }, { plugins });
