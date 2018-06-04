import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView, Animated } from 'react-native';
import { inject, observer, } from 'mobx-react';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from '../../../component/Item'
import { THEME_PRIMARY_COLOR } from '../../../../../../common-style/theme'
import MCSpinner from '../../../../../../component/Feedback/MCSpinner';
import CHParagraph from '../component/CHParagraph'
import CHSection from "../component/CHSection";
import CHKeyInformation from '../component/CHKeyInformation';

const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;

@inject(stores => ({
    experience: stores.experience
}))
@observer
class Experience extends Component {

    constructor(props) {
        super(props);
        this.state = {

            // 底部导航栏隐藏动画 透明度和距离参数
            opacityAnima: new Animated.Value(1),
            bottomAnima: new Animated.Value(0),

            // 底部导航栏是否可见
            bottomBarVisible: true,

            // 点赞图标样式
            heartName: 'ios-heart-outline',
            heartColor: 'black',

            // 收藏图标样式
            starColor: 'black',
            starName: 'ios-star-outline',
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
        this.props.experience.scrollY = e.nativeEvent.contentOffset.y
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

    // 渲染体验介绍文章
    renderIntroduction = (intro) => {
        let introduction = intro.toString()
        let body = [];
        let pattern = /\[img\]\((.*?)\)/gm;
        var parentWidth = Dimensions.get('window').width * 0.86;
        var parentHeight = 200;

        while (1) {
            let before = pattern.lastIndex;
            var match = pattern.exec(introduction);
            if (match == null) {
                // 最后的文字图片
                body.push(
                    <Text style={styles.context} key={before}>
                        {"       " + introduction.slice(before)}
                    </Text>
                )
                break;
            }

            // 匹配到的段落,要检查是否为空 渲染文字
            if (introduction.slice(before, match.index)) {
                body.push(
                    <Text style={styles.context} key={match.index}>
                        {"       " + introduction.slice(before, match.index)}
                    </Text>
                )
            }

            // 匹配到的地址 xxxxx 渲染图片
            Image.getSize(match[1], (sonWidth, sonHeight) => {
                
                console.log("sonwidth: " + sonWidth + " sonheig: " + sonHeight + " parentHeight : " + parentHeight)
            })
            console.log(" parentHeight : " + parentHeight)
            body.push(
                <Image 
                    source={{ uri: match[1] }} 
                    style={{ marginVertical: 17 * PIXEL_RATE_Y, 
                            width: parentWidth, 
                            height: parentHeight,
                    }} 
                    key={match[1]} />
            )
        }
        return body;
    }

    render() {
        if (this.props.experience.detailPageIniting == true) {
            // 初始页面显示时,显示菊花图
            return (
                <View style={{justifyContent: 'center', alignContent: 'center',}}>
                    <MCSpinner isVisible={this.props.experience.detailPageIniting} type="no-background" />
                </View>
            )
        } else 
        return (
            // 请求数据到达后显示玩法页面
            <View style={styles.container}>
                <ScrollView
                    onScroll={this.handleScroll}
                    onScrollEndDrag={this.endDrag}
                    onMomentumScrollEnd={(e) => {
                            this.props.experience.scrollY = e.nativeEvent.contentOffset.y;
                    }}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ alignItems: 'center'}}
                >
                    {/* 封面页面 */}
                    <ImageBackground source={{ uri: this.props.experience.detail.cover_img }} style={styles.cover}>
                        <View style={styles.Headercontainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.goBack();
                                }}
                                style={styles.backIcon}
                            >
                                <Ionicons name='ios-arrow-back' size={20 * PIXEL_RATE} style={{ marginTop: 2, color: 'white', backgroundColor: 'rgba(0,0,0,0)' }} />
                            </TouchableOpacity>
                            <View style={styles.optionContainer}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        this.props.experience.setCurrentTab(1);
                                    }}
                                    style={this.props.experience.currentTab === 1 ?
                                    styles.activeTabButton
                                    : styles.inactiveTabButton}
                                >
                                    <Text style={{
                                        fontSize: 16,
                                        color: "white",
                                    }}>体验</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        this.props.experience.setCurrentTab(2);
                                    }}
                                    style={this.props.experience.currentTab === 2 ?
                                    styles.activeTabButton
                                    : styles.inactiveTabButton}
                                >
                                    <Text style={{
                                        fontSize: 16,
                                        color: "white",
                                    }}>评论</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.coverDetail}>
                            <Text style={styles.experienceTitle}>{this.props.experience.detail.experience_title}</Text>
                            <Text style={styles.description}>{this.props.experience.detail.experience_brief_decription}</Text>
                            <Text style={styles.autor}>by{this.props.experience.detail.experience_author}</Text>
                        </View>
                    </ImageBackground>
                    
                    {/* 标签 */}
                    <View style={styles.tagsContainer}>
                        {this.props.experience.detail.tags.map((item) => {
                            return <Text style={styles.tags} key={item}>{item}</Text>
                        })}
                    </View>
                    
                    {/* 我为什么推荐 */}
                    <CHSection title="我为什么推荐" containerStyle={{ flexDirection: 'row', }}>
                        <Image 
                            source={{ uri: this.props.experience.detail.author_profile_img }} 
                            style={{
                                width: 49 * PIXEL_RATE,
                                height: 49 * PIXEL_RATE,
                                borderRadius: 24.5 * PIXEL_RATE,
                                marginLeft: 10 * PIXEL_RATE,
                            }} 
                        />
                        <Text 
                            style={[styles.context, {
                                marginLeft: 15 * PIXEL_RATE,
                                width: 236 * PIXEL_RATE,
                            }]
                        }>{this.props.experience.detail.recommend_reason}</Text>
                    </CHSection>
                    
                    {/* 体验介绍 */}
                    <CHSection title="体验介绍">
                        {this.renderIntroduction(this.props.experience.detail.experience_introduction)}
                    </CHSection>

                    {/* 重点信息 */}
                    <CHSection title="重点信息" seperatorStyle={{ display: 'none',}}>
                        <CHKeyInformation text={this.props.experience.detail.stress_information} />
                    </CHSection>

                    {/* 附近体验  */}
                    <View style={styles.nearbyExperience}>
                        <View style={styles.nearbyHeader}>
                            <View style={[styles.seperator, {width: 109 * PIXEL_RATE}]} />
                            <Text style={{fontSize: 16, marginTop: 30,}}>附近体验</Text>
                            <View style={[styles.seperator, { width: 109 * PIXEL_RATE }]} />
                        </View>
                        <View style={styles.nearbyContext}>
                            {this.props.experience.detail.nearby_experience.map((item, index) => {
                                return <Item title={item.experience_title}
                                            description={item.experience_brief_discription} 
                                            name={item.feature}
                                            photo={item.card_img}
                                            id={item.experience_id}
                                            navigation={this.props.navigation}
                                            experience={this.props.experience} 
                                            key={index} 
                                        />
                            })}
                        </View>
                    </View>
                </ScrollView>

                {/* 底部导航栏 */}
                <Animated.View style={[ styles.bottomBar, {opacity: this.state.opacityAnima, bottom: this.state.bottomAnima }]}>
                    <TouchableOpacity 
                        style={{marginLeft: 30 * PIXEL_RATE,}}
                        onPress={() => {
                            // this.props.navigation.goBack();
                            let rever = !this.state.bottomBarVisible
                            this.setState({
                                bottomBarVisible: rever
                            })
                        }}
                    >
                        <Ionicons name='ios-arrow-back' size={25 * PIXEL_RATE} color={'black'}/>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 * PIXEL_RATE,}} >
                        <TouchableOpacity
                            style={{marginHorizontal: 11 * PIXEL_RATE,}}
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

export default Experience;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    cover: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    Headercontainer: {
        height: 32 * PIXEL_RATE,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 28 * PIXEL_RATE_Y,
    },
    backIcon: {
        position: 'absolute',
        left: 16 * PIXEL_RATE,
        width: 40 * PIXEL_RATE,
        alignItems: 'center',
        height: 30 * PIXEL_RATE,
    },
    optionContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 16 * PIXEL_RATE + 40 * PIXEL_RATE,
        paddingRight: (16 * PIXEL_RATE + 40 * PIXEL_RATE) / 2,
    },
    activeTabButton: {
        width: 75,
        height: 36,
        borderColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    inactiveTabButton: {
        width: 75,
        height: 36,
        borderColor: 'white',
        borderRadius: 20,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    coverDetail: {
        marginLeft: 21 * PIXEL_RATE,
        marginTop: 448 * PIXEL_RATE_Y,
    },
    experienceTitle: {
        color: 'white',
        fontSize: 28,
        marginTop: 10,
    },
    description: {
        color: 'white',
        fontSize: 14,
        marginTop: 3,
    },
    autor: {
        color: 'white',
        fontSize: 14,
        marginTop: 20,
    },
    tagsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        paddingHorizontal: 5,
    },
    tags: {
        margin: 4,
        fontSize: 12,
        paddingVertical: 8,
        paddingHorizontal: 13,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 16,
        borderColor: 'rgba(187, 187, 187, 1)',
    },
    title: {
        marginLeft: 25,
        fontSize: 18,
        marginVertical: 20,
    },
    recomendDetail: {
        marginRight: 33 * PIXEL_RATE,
        marginLeft: 42 * PIXEL_RATE,
        flexDirection: 'row',
    },
    autorProfile: {
        width: 49 * PIXEL_RATE,
        height: 49 * PIXEL_RATE,
        borderRadius: 24.5 * PIXEL_RATE,
    },
    context: { 
        fontSize: 14, 
        lineHeight: 25,
    },
    seperator: {
        borderWidth: StyleSheet.hairlineWidth,
        opacity: 0.38,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
    },
    introduction: {

    },
    introductionImage: {
        width: 375 * PIXEL_RATE,
        height: 238 * PIXEL_RATE,
    },
    foldOrExpand: {
        flexDirection: 'row',
        marginRight: 35,
    },
    nearbyExperience: {
        width: Dimensions.get('window').width,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 45 * PIXEL_RATE,
    },
    nearbyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    nearbyContext: {
        marginTop: 8 * PIXEL_RATE,
        marginHorizontal: 11 * PIXEL_RATE,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    bottomBar: {
        width: Dimensions.get('window').width,
        height: 45 * PIXEL_RATE,
        backgroundColor: 'white',
        position:'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }

});

