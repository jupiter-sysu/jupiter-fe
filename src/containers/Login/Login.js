import React, { Component } from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions, TextInput, StatusBar, NetInfo, Platform, Alert,  } from "react-native";
import { observer, inject } from "mobx-react";
import { Button } from 'antd-mobile';
import MCButton from '../../component/DataEntry/MCButton';
import MCHeader from '../../component/Navigation/MCHeader';
import { THEME_PRIMARY_COLOR } from './../../common-style/theme';
import Form, { form } from './component/Login-form';
import { Toast } from 'antd-mobile';
import { fetch } from '../../utils/fetch';
import MCSpinner from '../../component/Feedback/MCSpinner';

const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;

@inject(['user'])
@observer // 监听当前组件
class Login extends Component {
    constructor(props) {
        super(props);
        form.$hooks.onSuccess = async(form) => {
            if (this.state.networkType === 'none' || this.state.networkType === 'NONE') {
                Toast.info('暂无网络，请检查您的网络设置', 2);
            } else {
                const postData = {
                    phone: Number(form.$('phone').value),
                    password: form.$('password').value,
                }
            }
        }

        form.$hooks.onError = (form) => {

        }

        this.state = {
            networkType: true,
            modalVisible: false,
        }
    }

    render() {
        return (
            <ImageBackground
                style={styles.container}
                source={require('./assets/White.png')}
            >
                <StatusBar barStyle='dark-content' />
                <MCSpinner isVisible={this.state.modalVisible} />
                <MCHeader
                    handler={() => this.props.navigation.goBack()}
                >手机号登录</MCHeader>

                <Form form={form} />
            </ImageBackground>
        );
    }

    componentDidMount() {
        NetInfo.addEventListener('connectionChange', (networkType) => {
            this.setState({networkType: networkType.type})
        })
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
});
