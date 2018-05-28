import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { inject, observer, } from 'mobx-react';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from '../../../component/Item'

const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;

@inject(stores => ({
    experience: stores.experience
}))
@observer
class Experience extends Component {

    componentDidMount() {
        // 请求资源

    }

    rendTags() {
        return this.props.experience.detail.data.tags.map((item) => {
            return <Text style={styles.tags} key={item}>{item}</Text>
        });
    }

    

    render() {
        console.log(this.props.navigation);
        return (
            <ScrollView style={styles.container}>
                <ImageBackground source={{ uri: "https://img-blog.csdn.net/20180528134720418" }} style={styles.cover}>
                    <View style={styles.Headercontainer}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('hi', this.props.navigation.goBack);
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
                        <Text style={styles.experienceTitle}>{this.props.experience.detail.data.experience_title}</Text>
                        <Text style={styles.description}>{this.props.experience.detail.data.experience_brief_decription}</Text>
                        <Text style={styles.autor}>by{this.props.experience.detail.data.experience_author}</Text>
                    </View>
                </ImageBackground>

                <View style={styles.tagsContainer}>
                    {this.rendTags()}
                </View>

                <View style={styles.recommend}>
                    <Text style={styles.title}>我为什么推荐</Text>
                    <View style={styles.recomendDetail}>
                        <Image source={{ uri: 'https://img-blog.csdn.net/20180528164959640'}} style={styles.autorProfile} />
                        <Text style={[styles.context, {
                            marginLeft: 15 * PIXEL_RATE,
                            width: 236 * PIXEL_RATE,}]
                        }>{this.props.experience.detail.data.recommend_reason}</Text>
                    </View>
                </View>
                <View style={styles.seperator} />
                
                <View style={styles.introduction}>
                    <Text style={styles.title}>体验介绍</Text>
                    <Image source={{ uri: 'https://img-blog.csdn.net/20180528173335773'}} style={styles.introductionImage}/>
                    <Text style={[
                                styles.context, {
                                marginHorizontal: 44 * PIXEL_RATE,
                                marginTop: 19 * PIXEL_RATE,
                        }]} 
                        numberOfLines={this.props.experience.introductionFold ? 5 : 100}
                    >{this.props.experience.detail.data.experience_introduction}</Text>
                    <View style={styles.foldOrExpand}>
                        <View style={{flex: 1}} />
                        <TouchableOpacity 
                            onPress={() => {
                                this.props.experience.introductionFold = !this.props.experience.introductionFold
                            }} 
                            style={{flexDirection: 'row',}}
                        >
                            <Text style={styles.context}
                            >{this.props.experience.introductionFold ? "展开" : "收起"}</Text>
                            <Ionicons name={this.props.experience.introductionFold ? 'ios-arrow-down' : 'ios-arrow-up'} style={{margin: 2,}} size={20 * PIXEL_RATE}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.seperator} />

                <View style={styles.importanceInformation}>
                    <Text style={styles.title}>重点信息</Text>
                    <Text style={[
                        styles.context, {
                            marginHorizontal: 44 * PIXEL_RATE,
                        }]} 
                    >{this.props.experience.detail.data.stress_infomation}
                    </Text>
                </View>

                <View style={styles.nearbyExperience}>
                    <View style={styles.nearbyHeader}>
                        <View style={[styles.seperator, {width: 109 * PIXEL_RATE}]} />
                        <Text style={{fontSize: 16, marginTop: 30,}}>附近体验</Text>
                        <View style={[styles.seperator, { width: 109 * PIXEL_RATE }]} />
                    </View>
                    <View style={styles.nearbyContext}>
                        {this.props.experience.detail.data.nearby_experience.map((item, index) => {
                            return <Item title={item.experience_title}
                                        description={item.experience_brief_discription} 
                                        name={item.feature}
                                        photo='https://img-blog.csdn.net/20180528173335773'
                                        id={item.experience_id}
                                        navigation={this.props.navigation}
                                        experience={this.props.experience} 
                                        key={index} 
                                    />
                        })}
                    </View>
                </View>

                <View style={styles.bottomBar}>
                </View>

  
            </ScrollView>
        )
    }
}

export default Experience;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
        borderColor: 'red',
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
        borderColor: 'black',
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
        marginHorizontal: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
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
        backgroundColor: 'rgba(245, 245, 245, 1)',
        justifyContent: 'center',
        alignContent: 'center',
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
        backgroundColor: 'grey',
        position: 'absolute',
        bottom: 0,
    }

});

