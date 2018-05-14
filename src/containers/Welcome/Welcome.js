import React, { Component } from "react";
import { View, StyleSheet, Image, Text, ImageBackground, Dimensions, AsyncStorage } from "react-native";
import { observer, inject } from "mobx-react";
import { create } from 'mobx-persist';
import { NavigationActions } from 'react-navigation';

import MCButton from '../../component/DataEntry/MCButton';
import stores from '../../store';
const PIXEL_RATE = Dimensions.get('screen').width / 375;

@observer // 监听当前组件
class Welcome extends Component {
    constructor(props) {
        super(props);
        this.handleSignupOnPress = this.handleSignupOnPress.bind(this);
        this.handleLoginOnPress = this.handleLoginOnPress.bind(this);
    }

    // 登陆按钮
    handleSignupOnPress() {
        this.props.navigation.navigate('signup');
    }

    handleLoginOnPress() {
        this.props.navigation.navigate('login');
    }

    componentDidMount() {
        const hydrate = create({ storage: AsyncStorage });
        const { user } = stores;
        hydrate('isLogin', user).then((data) => {
            if(data.isLogin) {
                console.log('hi');
                this.props.navigation.dispatch(NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'index' })
                    ]
                }));
            }
        });
        hydrate('userphone', user);
    }
 
    render() {
        return (
            <ImageBackground 
                style={styles.container} 
                source={require('./assets/Black.jpg')}
            >
                <Image 
                    style={styles.logo}
                    source={require('../../app-assets/Logo.png')} 
                />

                <View style={styles.buttonContainer}>
                    <MCButton
                        width={124 * PIXEL_RATE}
                        height={49 * PIXEL_RATE}
                        color="#000"
                        mainColor="#FFF"
                        handler={this.handleSignupOnPress}
                    >注册</MCButton>
                    <MCButton
                        width={124 * PIXEL_RATE}
                        height={49 * PIXEL_RATE}
                        color="#FFF"
                        mainColor="#FFF"
                        outline={true}
                        handler={this.handleLoginOnPress}
                    >登录</MCButton>
                </View> 
            </ImageBackground>
        );
    }
}

export default Welcome;

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 274 * PIXEL_RATE,
        position: 'absolute',
        bottom: 90 * PIXEL_RATE,
    },
    logo: {
        height: 87 * PIXEL_RATE,
        width: 189 * PIXEL_RATE,
        position: 'absolute',
        top: 77 * PIXEL_RATE,
    }
    
});
