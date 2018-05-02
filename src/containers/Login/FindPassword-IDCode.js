import React, { Component } from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions, TextInput, StatusBar, NetInfo, Platform, Alert, } from "react-native";
import { observer, inject } from "mobx-react";
import { Button } from 'antd-mobile';
import MCHeader from '../../component/Navigation/MCHeader';
import MCButton from '../../component/DataEntry/MCButton';
import { THEME_PRIMARY_COLOR } from './../../common-style/theme';
import { Toast } from 'antd-mobile';
import myFetch from '../../utils/fetch';
import MCSpinner from '../../component/Feedback/MCSpinner';
import { NavigationActions } from 'react-navigation';

const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;

@inject(['user']) // 注入store中的user到本组件的props里面
@observer // 监听当前组件
class FindPasswordIDCode extends Component {
    constructor(props) {
        super(props);
        this.handleTextSend = this.handleTextSend.bind(this)
        //this.reset = this.reset.bind(this)
    }

    async handleTextSend() {
        if (this.props.user.confirmCode.length === 4) {
            console.log('galo');
            let result = await this.props.user.validateFindPasswordIDCode();
            if (result == 200) {
                console.log("find password 验证码正确");
                // 跳转到 输入新密码
                this.props.navigation.navigate('findpasswordpassword');
            } else if (result == 401) {
                console.log("1111验证码错误啊，啊啊啊啊啊啊");
                Toast.info('验证码错误', 2);
                console.log("22222验证码错误啊，啊啊啊啊啊啊");
            } else if (result == 0) {
                Toast.info('暂无网络，请检查您的网络设置', 2);
            }
        }
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
                    handler={() => this.props.navigation.goBack()}
                ></MCHeader>
                <View style={styles.titleContainer}>
                    <Text style={{ fontSize: 26 * PIXEL_RATE, marginBottom: 5 * PIXEL_RATE }}>验证码已发送至</Text>
                    <Text style={{ textAlign: 'center', }}>{this.props.user.userphone.toString().slice(0, 3) + ' ' + this.props.user.userphone.toString().slice(3, 7) + ' ' + this.props.user.userphone.toString().slice(7, 11)}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.displayContianer}>
                        <View style={styles.number}><Text style={styles.numberText}>{this.props.user.confirmCode.toString().slice(0, 1)}</Text></View>
                        <View style={styles.number}><Text style={styles.numberText}>{this.props.user.confirmCode.toString().slice(1, 2)}</Text></View>
                        <View style={styles.number}><Text style={styles.numberText}>{this.props.user.confirmCode.toString().slice(2, 3)}</Text></View>
                        <View style={styles.number}><Text style={styles.numberText}>{this.props.user.confirmCode.toString().slice(3, 4)}</Text></View>
                    </View>

                    <View style={styles.hiddenContainer}>
                        <TextInput
                            value={this.props.user.confirmCode}
                            onChangeText={(text) => { this.props.user.changeConfirmCode(text); this.handleTextSend() }}
                            style={styles.textInput}
                            keyboardType="numeric"
                            selectionColor="rgba(0,0,0,0)"
                            autoFocus={true}
                        />
                    </View>
                </View>

                <MCButton
                    width={140 * PIXEL_RATE}
                    height={40 * PIXEL_RATE}
                    color="#FFF"
                    mainColor={THEME_PRIMARY_COLOR}
                    handler={() => { this.props.user.startCountdown(); this.props.user.getFindPasswordConfirmCode() }}
                    clickable={this.props.user.countdown === 0}
                >{this.props.user.countdown === 0 ? '重新发送' : `重新发送 (${this.props.user.countdown}s)`}</MCButton>
            </ImageBackground>
        );
    }

    componentDidMount() {
        NetInfo.addEventListener('connectionChange',
            (networkType) => {
                this.props.user.setNetworkType(networkType.type);
            }
        );
        this.props.user.startCountdown();

    }
}

export default FindPasswordIDCode;

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 100 * PIXEL_RATE,
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    inputContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        marginTop: 40 * PIXEL_RATE,
        borderWidth: 0,
        width: 250 * PIXEL_RATE,
        borderColor: 'red',
        marginBottom: 10,
    },
    textInput: {
        color: 'rgba(0,0,0,0)'
    },
    hiddenContainer: {
    },
    displayContianer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    number: {
        width: 40,
        height: 80,
        borderBottomWidth: 1,
        justifyContent: 'center',
        borderColor: '#BBBBBB'
    },
    numberText: {
        fontSize: 50,
        textAlign: 'center',
    }
});
