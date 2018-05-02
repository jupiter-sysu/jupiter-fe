import React, { Component } from 'react';
import {
    View, StyleSheet, Text, ImageBackground, Dimensions, TextInput,
    StatusBar, NetInfo, Platform, Alert,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import MCButton from '../../component/DataEntry/MCButton';
import MCHeader from '../../component/Navigation/MCHeader';
import { THEME_PRIMARY_COLOR } from './../../common-style/theme';
import Form, { form } from './component/FindPassword-password-form';
import { Toast } from 'antd-mobile';
import { myFetch } from '../../utils/fetch';
import MCSpinner from '../../component/Feedback/MCSpinner';

const PIXEL_RATE = Dimensions.get('screen').width / 375;

@inject(['user'])
@observer
class FindPasswordPassword extends Component {
    constructor(props) {
        super(props);

        form.$hooks.onSuccess = async (form) => {
            let result = await this.props.user.setNewPassword(form.$('password').value);
            if (result == 200) {
                this.props.navigation.navigate('login');
                Toast.info("修改成功");
                console.log("change password success, and go to login");
            } else if (result == 401) {
                setTimeout(() => {
                    
                }, 0)
            } else if (result == 0) {
                Toast.info('暂无网络，请检查您的网络设置', 2);
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