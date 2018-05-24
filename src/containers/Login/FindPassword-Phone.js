import React, { Component } from 'react';
import {
    View, StyleSheet, Text, ImageBackground, Dimensions, TextInput,
    StatusBar, NetInfo, Platform, Alert, Keyboard,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import MCButton from '../../component/DataEntry/MCButton';
import MCHeader from '../../component/Navigation/MCHeader';
import { THEME_PRIMARY_COLOR } from './../../common-style/theme';
import Form, { form } from './component/FindPassword-phone-form';
import { Toast } from 'antd-mobile';
import post from '../../utils/fetch';
import MCSpinner from '../../component/Feedback/MCSpinner';

const PIXEL_RATE = Dimensions.get('screen').width / 375;

@inject(['user'])
@observer
class FindPasswordPhone extends Component {
    constructor(props) {
        super(props);
        form.$hooks.onSuccess = async (form) => {
            if (props.user.networkType === 'none' || props.user.networkType === 'NONE') {
                Toast.info('暂无网络, 请检查您的网络设置', 2);
            } else {
                props.user.setModalVisible(true);
                post('/modify/get/captcha/', {
                    phone_num: Number(form.$('phone').value),
                }, (res) => {
                    Keyboard.dismiss();
                    props.user.setUserPhone(Number(form.$('phone').value));
                    props.user.confirmCode = '';
                    props.navigation.navigate('findpasswordidcode');
                }, (err) => {
                    if (err.enmsg === 'unregistered') {
                        setTimeout(() => {
                            Alert.alert(
                                '该手机号码未注册，\n请前往注册',
                                '',
                                [
                                    { text: '去注册', onPress: () => this.props.navigation.navigate('signup') },
                                    { text: '取消', onPress: () => { } },
                                ],
                                { cancelable: false },
                            );
                        }, 0);
                    } else {
                        Toast.info(err.enmsg, 2);
                    }
                }, () => {
                    this.props.user.setModalVisible(false);
                });
            }
        };
        form.$hooks.onError = (form) => {

        };
    }

    render() {
        return (

            <ImageBackground
                style={styles.container}
                source={require('./assets/White.png')}
            >
                <StatusBar barStyle="dark-content" />
                <MCSpinner isVisible={this.props.user.modalVisible} />
                <MCHeader
                    handler={() => {
                        form.clear();
                        this.props.navigation.goBack();
                    }}
                >找回密码
        </MCHeader>
                <Form form={form} />
            </ImageBackground>
        );
    }
}

export default FindPasswordPhone;

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 100 * PIXEL_RATE,
    },
});
