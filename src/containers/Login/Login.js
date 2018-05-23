import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, Dimensions, TextInput, StatusBar, NetInfo, Platform, Alert, Keyboard } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd-mobile';
import MCButton from '../../component/DataEntry/MCButton';
import MCHeader from '../../component/Navigation/MCHeader';
import { THEME_PRIMARY_COLOR } from './../../common-style/theme';
import Form, { form } from './component/Login-form';
import { Toast } from 'antd-mobile';
import post from '../../utils/fetch';
import MCSpinner from '../../component/Feedback/MCSpinner';
import { NavigationActions } from 'react-navigation';

const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;

@inject(['user'])
@observer // 监听当前组件
class Login extends Component {
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);

        form.$hooks.onSuccess = async (form) => {
            if (props.user.networkType === 'none' || props.user.networkType === 'NONE') {
                Toast.info('暂无网络, 请检查您的网络设置', 2);
            } else {
                props.user.setModalVisible(true);
                post('/login/mobile_login/', {
                    phone_num: Number(form.$('phone').value),
                    password: form.$('password').value,
                }, (res) => {
                    console.log(res);
                    Keyboard.dismiss();
                    props.user.login();
                    props.user.setUserPhone(Number(form.$('phone').value));
                    props.navigation.navigate('index');
                }, (err) => {
                    console.log(err);
                    if (err.enmsg === 'unregistered_phone' || err.enmsg === 'wrong_password') {
                        Toast.info('账号或密码错误, 请检查您的输入', 2);
                    } else {
                        Toast.info(err.cnmsg, 2);
                    }

                }, () => {
                    this.props.user.setModalVisible(false);
                }, );
            }
        };

        form.$hooks.onError = (form) => {

        };

        this.state = {
            networkType: true,
            modalVisible: false,
        };
    }

    reset() {
        return this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'index' }),
            ],
        }));
    }

    render() {
        return (
            <ImageBackground
                style={styles.container}
                source={require('./assets/White.png')}
            >
                <StatusBar barStyle="dark-content" />
                <MCSpinner isVisible={this.state.modalVisible} />
                <MCHeader
                    handler={() => this.props.navigation.goBack()}
                >手机号登录
                </MCHeader>

                <Form form={form} naviga={this.props.navigation} />
            </ImageBackground>
        );
    }

    componentDidMount() {
        NetInfo.addEventListener('connectionChange', (networkType) => {
            this.setState({ networkType: networkType.type });
        });
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100 * PIXEL_RATE,
    },
    Findpasswordbutton: {
        position: 'relative',
        left: 2 * PIXEL_RATE,
        top: 2 * PIXEL_RATE,
    },
});
