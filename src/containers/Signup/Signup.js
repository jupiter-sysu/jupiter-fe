import React, { Component } from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions, TextInput, StatusBar, NetInfo, Platform, Alert,  } from "react-native";
import { observer, inject } from "mobx-react";
import { Button } from 'antd-mobile';
import MCHeader from '../../component/Navigation/MCHeader';
import MCButton from '../../component/DataEntry/MCButton';
import { THEME_PRIMARY_COLOR } from './../../common-style/theme';
import Form, {form} from './component/Signup-form';
import { Toast } from 'antd-mobile';
import myFetch from '../../utils/fetch';
import MCSpinner from '../../component/Feedback/MCSpinner';

const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;

@inject(['user']) // 注入store中的user到本组件的props里面
@observer // 监听当前组件
class Signup extends Component {
    constructor(props) {
        super(props);
        form.$hooks.onSuccess = async (form) => {
            let result = await this.props.user.getConfirmCode(form.$('phone').value, form.$('password').value);
            console.log(result);
            if (result) {
                this.props.navigation.navigate('signupidcode');
            } else {
                setTimeout(() => {
                    Alert.alert(
                        '该手机号码已注册，\n请直接登录',
                        '',
                        [
                            { text: '去登录', onPress: () => this.props.navigation.navigate('login') },
                            { text: '取消', onPress: () => { } },
                        ],
                        { cancelable: false }
                    )
                }, 0)
            }
            
        }
        form.$hooks.onError = (form) => {
            // toast提示信息，感觉有点重复，不需要了
            // const errors = form.errors();
            // const keys = Object.keys(errors);
            // for (let i = 0; i < keys.length; i++) {
            //     if (errors[keys[i]] !== null) {
            //         Toast.info(errors[keys[i]], 2);
            //         break;
            //     }
            //     continue;
            // }       
        }
    }

    render() {
        return (
            <ImageBackground
                style={styles.container}
                source={require('./assets/White.png')}
            >
                <StatusBar barStyle="dark-content"  />
                <MCSpinner isVisible={this.props.user.modalVisible} />
                <MCHeader
                    handler={() => { form.clear(); this.props.navigation.goBack()}}
                >手机号注册</MCHeader>

                <Form form={form} /> 
            </ImageBackground>
        );
    }

    componentDidMount() {
        NetInfo.addEventListener('connectionChange',
            (networkType) => {
                this.props.user.setNetworkType(networkType.type);
            }
        );
    }
}

export default Signup;

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
