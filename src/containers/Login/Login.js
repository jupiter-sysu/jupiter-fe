import React, { Component } from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions, TextInput, StatusBar, NetInfo, Platform, Alert,  } from "react-native";
import { observer, inject } from "mobx-react";
import { Button } from 'antd-mobile';
import MCButton from '../../component/DataEntry/MCButton';
import MCHeader from '../../component/Navigation/MCHeader';
import { THEME_PRIMARY_COLOR } from './../../common-style/theme';
import Form, { form } from './component/Login-form';
import { Toast } from 'antd-mobile';
import { myFetch } from '../../utils/fetch';
import MCSpinner from '../../component/Feedback/MCSpinner';
import { NavigationActions } from 'react-navigation';

const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;

@inject(['user'])
@observer // 监听当前组件
class Login extends Component {
    constructor(props) {
        super(props);
        
        form.$hooks.onSuccess = async(form) => {
            let result = await this.props.user.loginWithPhone(form.$('phone').value, form.$('password').value);
            if (result == 200) {
                // this.props.navigation.navigate()
                this.reset();
                console.log("login success");
            } else if (result == 401 || result == 402) {
                console.log("Login fail");
                setTimeout(() => {
                    Toast.info("账号或密码错误，请检查您的输入");
                }, 0);
            }
        }
        
        form.$hooks.onError = (form) => {
            
        }

        
        this.state = {
            networkType: true,
            modalVisible: false,
        }
    }
    
    FindPasswordPhone = () => {
        this.props.navigation.navigate('FindPasswordPhone');
    }

    reset() {
        return this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'index' })
            ]
        }));
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

                <Form form={form} naviga={this.props.navigation} />
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
    Findpasswordbutton: {
        position: 'relative',
        left: 2 * PIXEL_RATE,
        top: 2 * PIXEL_RATE,
    }
});
