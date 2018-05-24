import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, Modal, TouchableOpacity, Animated, Easing, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { THEME_PRIMARY_COLOR } from '../../common-style/theme';

const styles = StyleSheet.create({
    tabbar: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0,
        borderTopColor: '#CCC',
        backgroundColor: '#FFF'
    },
    tab: {
        alignSelf: 'stretch',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        marginTop: 4,
        color: '#474747',
        fontSize: 14,
    },
    addContainer: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#fdfdfd',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 1, height: 1, },
        shadowColor: 'black',
        shadowOpacity: .2,
        marginBottom: 26,
        marginLeft: 5,
        marginRight: 5 
    },
    addContainerModal: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#fdfdfd',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 1, height: 1, },
        shadowColor: 'black',
        shadowOpacity: .2,
        marginBottom:11,
    },
    addInsideContainer: {
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: THEME_PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        borderWidth: 0,
        borderColor: 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(1,1,1,0.7)',
    },
    buttonContainer: {
        width: 76,
        height: 76,
        borderRadius: 38,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

class TabBar extends Component{
    constructor(props) {
        super(props);
        this.renderTab = this.renderTab.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.reset = this.reset.bind(this);
        this.state = {
            showModal: false,
            addButtonRotateAngle: new Animated.Value(0),
            showButton1: new Animated.Value(0),
            showButton2: new Animated.Value(0),
            showButton3: new Animated.Value(0),
            marginBottomButton1: new Animated.Value(-40),
            marginBottomButton2: new Animated.Value(-40),
            marginBottomButton3: new Animated.Value(-40),
        }
    }

    renderTab(index, route, label) {
        const {
            navigation,
            renderIcon,
            activeTintColor,
            inactiveTintColor,
            jumpToIndex
        } = this.props;
        const focused = index === navigation.state.index;
        const tintColor = focused ? activeTintColor : inactiveTintColor;
        return (
            <TouchableWithoutFeedback
                style={styles.tab}
                onPress={() => jumpToIndex(index)}
            >
                <View style={styles.tab}>
                    {renderIcon({
                        route,
                        index,
                        focused,
                        tintColor
                    })}
                    <Text style={styles.label}>{label}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    reset() {
        this.setState({
            addButtonRotateAngle: new Animated.Value(0),
            showButton1: new Animated.Value(0),
            showButton2: new Animated.Value(0),
            showButton3: new Animated.Value(0),
            marginBottomButton1: new Animated.Value(-40),
            marginBottomButton2: new Animated.Value(-40),
            marginBottomButton3: new Animated.Value(-40),
        })
    }

    showModal() {
        this.setState({ showModal: true });
        Animated.parallel([
            // 随时间变化而执行的动画类型
            Animated.spring(
                this.state.addButtonRotateAngle,                      // 动画中的变量值
                {
                    toValue: 1,
                },
            ),
            Animated.timing(
                this.state.showButton1,                      // 动画中的变量值
                {
                    toValue: 1,
                    duration: 200
                },
            ),
            Animated.timing(
                this.state.showButton2,                      // 动画中的变量值
                {
                    toValue: 1,
                    duration: 200,
                    delay: 130
                },
            ),
            Animated.timing(
                this.state.showButton3,                      // 动画中的变量值
                {
                    toValue: 1,
                    duration: 200,
                    delay: 260
                },
            ),
            Animated.parallel([
                Animated.spring(
                    this.state.marginBottomButton1,                      // 动画中的变量值
                    {
                        toValue: 120,
                        friction: 4,
                        tension: 40
                    },
                ),
                Animated.spring(
                    this.state.marginBottomButton2,                      // 动画中的变量值
                    {
                        toValue: 120,
                        delay: 130,
                        friction: 4,
                        tension: 40
                    },
                ),
                Animated.spring(
                    this.state.marginBottomButton3,                      // 动画中的变量值
                    {
                        toValue: 120,
                        delay: 260,
                        friction: 4,
                        tension: 40
                    },
                ),
            ]),
        ]).start();  
    }

    hideModal() {
        Animated.parallel([
            // 随时间变化而执行的动画类型
            Animated.timing(
                this.state.addButtonRotateAngle,                      // 动画中的变量值
                {
                    toValue: 0,
                },
            ),
            Animated.timing(
                this.state.showButton3,                      // 动画中的变量值
                {
                    toValue: 0,
                    duration: 200
                },
            ),
            Animated.timing(
                this.state.showButton2,                      // 动画中的变量值
                {
                    toValue: 0,
                    duration: 200,
                    delay: 130
                },
            ),
            Animated.timing(
                this.state.showButton1,                      // 动画中的变量值
                {
                    toValue: 0,
                    duration: 200,
                    delay: 260
                },
            ),
            Animated.parallel([
                Animated.timing(
                    this.state.marginBottomButton3,                      // 动画中的变量值
                    {
                        toValue: 0,
                        duration: 130
                    },
                ),
                Animated.timing(
                    this.state.marginBottomButton2,                      // 动画中的变量值
                    {
                        toValue: 0,
                        delay: 130,
                        duration: 130
                    },
                ),
                Animated.timing(
                    this.state.marginBottomButton1,                      // 动画中的变量值
                    {
                        toValue: 0,
                        delay: 260,
                        duration: 130,
                    },
                ),
            ]),
        ]).start(() => {
            this.setState({ showModal: false });
        });
    }

    

    render() {
        const {
            navigation,
            renderIcon,
            activeTintColor,
            inactiveTintColor,
            jumpToIndex
        } = this.props;

        const {
            routes
        } = navigation.state;

        return (
            <View style={styles.tabbar}>
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={this.state.showModal}
                    onRequestClose={() => { alert("Modal has been closed.") }}
                    
                >
                    <TouchableOpacity 
                        style={styles.modal}
                        onPress={() => { this.hideModal() }}
                        activeOpacity={1}
                    >
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            paddingLeft: '15%',
                            paddingRight: '15%',
                            width: '100%',
                            height: 280,
                            paddingTop: 40,
                            position: 'absolute',
                            bottom: 0,
                        }}>
                            <Animated.View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: this.state.showButton1,
                                marginBottom: this.state.marginBottomButton1
                            }}>
                                <TouchableOpacity
                                    style={[styles.buttonContainer, { backgroundColor: '#efc24e'}]}
                                    onPress={() => {
                                        this.reset(); 
                                        this.setState({ showModal: false });
                                        this.props.navigation.navigate('error');
                                     }}
                                >
                                    <Ionicons name="ios-create" size={34} style={{ color: '#FFF', marginLeft: 4 }} />
                                </TouchableOpacity>
                                <Text style={{ color: '#FFF', marginTop: 8,fontSize: 16, fontWeight: 'bold'}}>创建体验</Text>
                            </Animated.View>

                            <Animated.View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: this.state.showButton2,
                                marginBottom: this.state.marginBottomButton2 
                            }}>
                                <TouchableOpacity
                                    style={[styles.buttonContainer, { backgroundColor: '#FF8159' }]}
                                    onPress={() => { 
                                        this.setState({ showModal: false });
                                        this.props.navigation.navigate('welcome');
                                     }}
                                >
                                    <Ionicons name="ios-images" size={34} style={{ color: '#FFF' }} />
                                </TouchableOpacity>
                                <Text style={{ color: '#FFF', marginTop: 8, fontSize: 16, fontWeight: 'bold' }}>撰写游记</Text>
                            </Animated.View>

                            <Animated.View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: this.state.showButton3,
                                marginBottom: this.state.marginBottomButton3
                            }}>
                                <TouchableOpacity
                                    style={[styles.buttonContainer, { backgroundColor: '#0DC3CB' }]}
                                    onPress={() => { this.props.navigation.navigate('welcome') }}
                                >
                                    <Ionicons name="ios-megaphone" size={34} style={{ color: '#FFF', marginLeft: 4 }} />
                                </TouchableOpacity>
                                <Text style={{ color: '#FFF', marginTop: 8, fontSize: 16, fontWeight: 'bold' }}>点评行程</Text>
                            </Animated.View>
                        </View>
                        <TouchableWithoutFeedback
                            style={styles.addContainerModal}
                            onPress={() => { this.hideModal() }}
                        >
                            <View style={styles.addContainerModal}>
                                <Animated.View style={{
                                    transform: [{
                                        rotate: this.state.addButtonRotateAngle.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0deg', '135deg']
                                        }) }],
                                    height: 48,
                                    width: 48,
                                    borderRadius: 24,
                                    backgroundColor: THEME_PRIMARY_COLOR,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image
                                        source={require('../../app-assets/nav/cross.png')}
                                    />
                                </Animated.View>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
                {this.renderTab(0, routes[0], '体验')}
                {this.renderTab(1, routes[1], '游记')}
                <TouchableWithoutFeedback
                    style={styles.addContainer}
                    onPress={() => {
                        this.showModal();
                    }}
                >
                    <View style={styles.addContainer}>
                        <View style={styles.addInsideContainer}>
                            <Image
                                source={require('../../app-assets/nav/cross.png')}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                {this.renderTab(2, routes[2], '行程')}
                {this.renderTab(3, routes[3], '我的')}

                
            </View>
        );
  }
};

export default TabBar;