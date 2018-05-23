import React, { Component } from 'react';
import {
    View, StyleSheet, Text, ImageBackground, Dimensions, TextInput,
    StatusBar, NetInfo, Platform, Alert, Keyboard
} from 'react-native';
import { observer, inject } from 'mobx-react';
import MCButton from '../../component/DataEntry/MCButton';
import MCHeader from '../../component/Navigation/MCHeader';
import { THEME_PRIMARY_COLOR } from './../../common-style/theme';
import Form, { form } from './component/FindPassword-password-form';
import { Toast } from 'antd-mobile';
import post from '../../utils/fetch';
import MCSpinner from '../../component/Feedback/MCSpinner';

const PIXEL_RATE = Dimensions.get('screen').width / 375;

@inject(['user'])
@observer
class FindPasswordPassword extends Component {
    constructor(props) {
        super(props);

        form.$hooks.onSuccess = async (form) => {
            if (props.user.networkType === 'none' || props.user.networkType === 'NONE') {
                Toast.info('暂无网络, 请检查您的网络设置', 2);
            } else {
                props.user.setModalVisible(true);
                post('/modify/password/', {
                    password: form.$('password').value,
                }, (res) => {
                    Keyboard.dismiss();
                    Toast.info("修改成功");
                    props.user.setUserPassword('');
                    props.navigation.navigate('login');
                }, (err) => {
                    if (err.enmsg != "ok") {
                        Toast.info(err.cnmsg, 2);
                    }
                }, () => {
                    this.props.user.setModalVisible(false);
                }
                )
            }
        }


        form.$hooks.onError = (form) => {

        }


    }
    render() {
        return (

            <ImageBackground
                style={styles.container}
                source={require('./assets/White.png')}
            >
                <StatusBar barStyle='dark-content' />
                <MCSpinner isVisible={this.props.user.modalVisible} />
                <MCHeader
                    handler={() => {
                        form.clear();
                        this.props.navigation.goBack()
                    }}
                >找回密码
                </MCHeader>
                <Form form={form} />
            </ImageBackground>
        );
    }
}

export default FindPasswordPassword;

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 100 * PIXEL_RATE,
    }
});