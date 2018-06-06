import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView, Animated, StatusBar, TouchableHighlight } from 'react-native';
import { inject, observer,  } from 'mobx-react';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from '../../component/Item'
import { THEME_PRIMARY_COLOR } from '../../../../../common-style/theme'
import MCSpinner from '../../../../../component/Feedback/MCSpinner';
import CHParagraph from './component/CHParagraph'
import CHSection from "./component/CHSection";
import CHKeyInformation from './component/CHKeyInformation';

import Experience from './tabContainers/Experience';
import Comments from './tabContainers/comment/Comments';

const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;

@inject(stores => ({
    experience: stores.experience
}))
@observer
class ExperienceDetailTabContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {

            // 底部导航栏隐藏动画 透明度和距离参数
            opacityAnima: new Animated.Value(1),
            bottomAnima: new Animated.Value(0),

            // 顶部导航栏滑动条动画参数
            switchAnima: new Animated.Value(0),

            // 底部导航栏是否可见
            bottomBarVisible: true,

            // 点赞图标样式
            heartName: 'ios-heart-outline',
            heartColor: 'black',

            // 收藏图标样式
            starColor: 'black',
            starName: 'ios-star-outline',

            // 顶部切换到哪个页面
            currentTab: 1,
        }
        this.endDrag = this.endDrag.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleStar = this.handleStar.bind(this);
    }

    componentDidMount() {
        // 请求资源
        this.props.experience.loadExperiencePage();
    }

    // 用于处理滚动 隐藏显示导航栏
    endDrag = (e) => {
        this.props.experience.setScrollY(e.nativeEvent.contentOffset.y)
        console.log(e.nativeEvent.contentOffset.y)
    }

    onScrollEnd = (e) => {
        this.props.experience.setScrollY(e.nativeEvent.contentOffset.y)
        console.log(e.nativeEvent.contentOffset.y)
    }

    // 处理滚动时, 触发隐藏展示底部导航栏
    handleScroll = (e) => {
        if (this.state.bottomBarVisible && e.nativeEvent.contentOffset.y - this.props.experience.scrollY > 30) {
            Animated.parallel([
                Animated.timing(
                    this.state.opacityAnima,
                    {
                        toValue: 0,
                    }
                ),
                Animated.timing(
                    this.state.bottomAnima,
                    {
                        toValue: -45 * PIXEL_RATE,
                    }
                )
            ]).start();
            this.setState({
                bottomBarVisible: false
            })
        } else if (!this.state.bottomBarVisible && e.nativeEvent.contentOffset.y - this.props.experience.scrollY < -20) {
            Animated.parallel([
                Animated.timing(
                    this.state.opacityAnima,
                    {
                        toValue: 1,
                    }
                ),
                Animated.timing(
                    this.state.bottomAnima,
                    {
                        toValue: 0 * PIXEL_RATE,
                    }
                )
            ]).start();
            this.setState({
                bottomBarVisible: true
            })
        }
    }

    // 处理点赞
    handleLike() {
        if (this.state.heartName == 'ios-heart') {
            this.setState({
                heartName: 'ios-heart-outline',
                heartColor: 'black',
            })
        } else {
            this.setState({
                heartName: 'ios-heart',
                heartColor: THEME_PRIMARY_COLOR,
            })
        }
    }

    // 处理收藏
    handleStar() {
        if (this.state.starName == 'ios-star') {
            this.setState({
                starName: 'ios-star-outline',
                starColor: 'black',
            })
        } else {
            this.setState({
                starName: 'ios-star',
                starColor: THEME_PRIMARY_COLOR,
            })
        }
    }

    switchToExperience = () => {
        this._scrollView.scrollTo({ x: 0, animated: true });
        this.setState({
            currentTab: 1,
        })
    }
    
    switchToComment = () => {
        this._scrollView.scrollTo({ x: Dimensions.get('window').width, animated: true })
        this.setState({
            currentTab: 2,
        })
    }

    handleSwitchTab = (e) => {
        let x = e.nativeEvent.contentOffset.x
        tab = Math.round(x / Dimensions.get('window').width) + 1;
        if (tab != this.state.currentTab) {
            this.setState({
                currentTab: tab,
            })
            console.log("currentTab: tab" + tab);
        }
    }

    handleScrollSwitch = (e) => {
        Animated.event([{
            nativeEvent: {
                contentOffset: {
                    x: this.state.switchAnima
                }
            }
        }])(e)
    }

    render() {
        if (this.props.experience.detailPageIniting == true) {
            // 初始页面显示时,显示菊花图
            return (
                <View style={{ justifyContent: 'center', alignContent: 'center', }}>
                    <MCSpinner isVisible={this.props.experience.detailPageIniting} type="no-background" />
                </View>
            )
        } else {
            let interpolateLeft = this.state.switchAnima.interpolate({
                inputRange: [0, Dimensions.get('window').width],
                outputRange: [92 * PIXEL_RATE, 242 * PIXEL_RATE],
                extrapolate: 'clamp'
            })
            return (
                <View style={styles.container}>
                    <View style={styles.headerBar}>
                        <StatusBar barStyle="dark-content" />
                        <TouchableHighlight 
                            style={styles.headerBarButton}
                            onPress={this.switchToExperience}
                            underlayColor="#f5f5f5"
                            ref={(ref) => {
                                this._firstButton = ref
                            }}
                        >
                            <Text style={{ fontSize: 20, color: (this.state.currentTab==1?'black':'grey')}}>
                                体验
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.headerBarButton}
                            onPress={this.switchToComment}
                            underlayColor="#f5f5f5"
                        >
                            <Text style={{ fontSize: 20, color: (this.state.currentTab == 1 ? 'grey' : 'black')}}>
                                点评
                            </Text>
                        </TouchableHighlight>

                        {/* 滑动条 */}
                        <Animated.View style={[styles.slider, {left: interpolateLeft}]} />
                    </View>

                    <ScrollView 
                        horizontal='true' 
                        pagingEnabled='true' 
                        ref={(ref) => this._scrollView = ref}
                        onMomentumScrollEnd={this.handleSwitchTab}
                        onScroll={this.handleScrollSwitch}
                        scrollEventThrottle={16}
                    >
                        {/* 体验详情页 */}
                        <Experience 
                            handleScroll={this.handleScroll} 
                            endDrag={this.endDrag} 
                            onScrollEnd={this.onScrollEnd}
                            navigation={this.props.navigation}
                        />

                        {/* 评论页面 */}
                        <Comments 
                            handleScroll={this.handleScroll}
                            endDrag={this.endDrag}
                            onScrollEnd={this.onScrollEnd}
                            navigation={this.props.navigation}
                        />
                    </ScrollView>

                    {/* 底部导航栏 */}
                    <Animated.View style={[styles.bottomBar, { opacity: this.state.opacityAnima, bottom: this.state.bottomAnima }]}>
                        <TouchableOpacity
                            style={{ marginLeft: 30 * PIXEL_RATE, }}
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                        >
                            <Ionicons name='ios-arrow-back' size={25 * PIXEL_RATE} color={'black'} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 * PIXEL_RATE, }} >
                            <TouchableOpacity
                                style={{ marginHorizontal: 11 * PIXEL_RATE, }}
                            >

                                <Ionicons name="ios-create-outline" size={25 * PIXEL_RATE} color={'black'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.handleLike}
                                style={{ marginHorizontal: 11 * PIXEL_RATE, }}
                            >
                                <Ionicons name={this.state.heartName} size={25 * PIXEL_RATE} color={this.state.heartColor} />
                                <Text style={{ fontSize: 10, position: 'absolute', left: 20 * PIXEL_RATE, top: -5 * PIXEL_RATE, }}> 127 </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.handleStar}
                                style={{ marginHorizontal: 11 * PIXEL_RATE, }}
                            >
                                <Ionicons name={this.state.starName} size={25 * PIXEL_RATE} color={this.state.starColor} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("like");
                                }}
                                style={{ marginHorizontal: 11 * PIXEL_RATE, }}
                            >
                                <Ionicons name="ios-share-outline" size={25 * PIXEL_RATE} color={'black'} />
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            )
        }
    }
}

const headerBarHeight = 35 * PIXEL_RATE_Y;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerBar: {
        position: 'absolute',
        paddingTop: 20 * PIXEL_RATE_Y,
        top: 0,
        zIndex: 3,
        width: Dimensions.get('window').width,
        height: 20 * PIXEL_RATE_Y + headerBarHeight,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerBarButton: {
        width: Dimensions.get('window').width / 2 * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        height: headerBarHeight,
    },
    bottomBar: {
        width: Dimensions.get('window').width,
        height: 45 * PIXEL_RATE_Y,
        backgroundColor: 'white',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    slider: {
        width: 40 * PIXEL_RATE,
        height: 5 * PIXEL_RATE_Y,
        backgroundColor: THEME_PRIMARY_COLOR,
        position: 'absolute',
        bottom: 0,
        
    }

});

export default ExperienceDetailTabContainer;


