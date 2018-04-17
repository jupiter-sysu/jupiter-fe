import React, { Component } from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions } from "react-native";
import { observer, inject } from "mobx-react";
import MCHeader from '../../component/Navigation/MCHeader';

@observer // 监听当前组件
class Login extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <ImageBackground
                style={styles.container}
                source={require('./assets/White.png')}
            >
                <MCHeader
                    handler={() => this.props.navigation.goBack()}
                >手机号登录</MCHeader>
            </ImageBackground>
        );
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
    },
    header: {
        position: 'absolute',
        top: 24,
        borderWidth: 1,
        borderColor: 'red',
    }

});
