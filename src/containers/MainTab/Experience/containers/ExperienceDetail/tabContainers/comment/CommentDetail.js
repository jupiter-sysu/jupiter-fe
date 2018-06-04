import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { observer, inject } from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';


const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;

@inject(stores => ({
    experience: stores.experience
}))
@observer
class CommentDetail extends Component {

    componentDidMount() {
        // 请求资源
        this.props.experience.loadCommentReview();
    }

    render(){
        const { experience } = this.props;
        const { currentCommentReview } = experience;
        const comments = currentCommentReview === null ? [] : currentCommentReview.comments;
        const user_name = currentCommentReview === null ? '' : currentCommentReview.user_name;
        const user_profile_img = currentCommentReview === null ? '' : currentCommentReview.user_profile_img;
        const review_date = currentCommentReview === null ? '' : currentCommentReview.review_date;
        const star_rank = currentCommentReview === null ? '' : currentCommentReview.star_rank;
        const review_text = currentCommentReview === null ? '' : currentCommentReview.review_text;
        const review_imgs = currentCommentReview === null ? [] : currentCommentReview.review_imgs;
        const review_tags = currentCommentReview === null ? [] : currentCommentReview.review_tags;
        return (
            <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: 375 * PIXEL_RATE, height: 50 * PIXEL_RATE_Y, backgroundColor: 'white'}}>
                <TouchableOpacity
                        onPress={() => {
                            console.log('hi', this.props.navigation.goBack);
                            this.props.navigation.goBack();
                        }}
                        style={styles.backIcon}
                    >
                        <Ionicons name='ios-arrow-back' size={20 * PIXEL_RATE} style={{ marginTop: 2, color: 'black'}} />
                    </TouchableOpacity>
                <Text style={{marginLeft: 135 * PIXEL_RATE, fontSize: 16 * PIXEL_RATE}}>点评详情</Text>
            </View>
            <ScrollView>
            <View style={styles.container}>
                <Image source={{uri: user_profile_img}} style={styles.profilePicture} />
                <View style={styles.triangle} />
                <View
                    style={styles.contentContainer}
                >
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.name}>{user_name}</Text>
                            <Text style={styles.date}>{review_date}</Text>
                        </View>
                        <View style={{marginLeft: 20 * PIXEL_RATE, flexDirection: 'row'}}>
                            <Ionicons name="ios-star" size={15 * PIXEL_RATE} style={{color: '#101010'}}/>
                            {
                                ['','','','',''].map((item, index) => {
                                    if (index < Number(star_rank)-1) {
                                        return <Ionicons name="ios-star" size={15 * PIXEL_RATE} style={{color: '#101010', marginLeft: 5 * PIXEL_RATE}}/>
                                    }
                                })
                            }
                        </View>
                        <View style={styles.label}>
                            {
                                review_tags.map((l) => {
                                    return <Text style={{fontSize: 14 * PIXEL_RATE, color: '#BEC2C9'}}>#{l}# </Text>
                                })
                            }
                        </View>
                        <Text style={styles.article}>
                            {review_text}
                        </Text>
                        <View 
                            style={styles.photo}
                            
                        >
                        {
                            review_imgs.length === 1 ?
                            <TouchableOpacity
                                onPress={(e) => console.log(e.nativeEvent)}
                            >
                            <Image
                                style={styles.image_big}
                                source={{uri: review_imgs[0]}}
                            />
                            </TouchableOpacity>
                            :
                            review_imgs.map((p) => {
                                return (
                                <TouchableOpacity>
                                    <Image 
                                        style={styles.image_little}
                                        source={{uri: p}}
                                    />
                                </TouchableOpacity>
                                )
                            }) 
                        }
                        </View>
                        <View style={styles.icon}>
                            <View style={{
                                
                                width: 24,
                                height: 24,
                            }}>
                                <TouchableOpacity
                                    onPress = {() => {
                                        experience.toggleLikeStatus();
                                    }}
                                >
                                    <Ionicons name={experience.isLike ?  'ios-thumbs-up' : 'ios-thumbs-up-outline'} size={24 * PIXEL_RATE} style={{color: '#101010'}}/>
                                </TouchableOpacity>
                                <Text style={{
                                    position: 'absolute',
                                    bottom: -4,
                                    right: -3,
                                    
                                }}>1</Text>
                            </View>
                            
                            <View style={{
                                marginLeft: 18 * PIXEL_RATE,
                                width: 24,
                                height: 24,
                            }}>
                                <Ionicons name='md-chatbubbles' size={24 * PIXEL_RATE} style={{color: '#101010'}}/>
                                <Text style={{
                                    position: 'absolute',
                                    bottom: -4,
                                    right: -5,
                                }}>1</Text>
                            </View>
        
                        </View>
                    </View>

                    <View style={{width: 276 * PIXEL_RATE, height: 0.5 * PIXEL_RATE_Y, backgroundColor: 'gray', marginTop: 8 * PIXEL_RATE_Y, marginLeft: 15 * PIXEL_RATE}}/>

                    <View style={styles.commentlist}>
                        {
                            comments.map((c) => {
                                return (
                                    <Text style={{marginTop: 5 * PIXEL_RATE, fontSize: 14 * PIXEL_RATE}}>
                                        {`${c.comment_user_name} : ${c.comment_text}`}
                                    </Text>
                                )
                            })
                        }
                    </View>
                </View>
                </View>
            </ScrollView>
            </View>
          )
    }
}

export default CommentDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 375 * PIXEL_RATE,
    flexDirection: 'row',
    marginTop: 10 * PIXEL_RATE
  },
  backIcon: {
        marginLeft: 20 * PIXEL_RATE,
        alignItems: 'center',
    },
  profilePicture: {
    marginLeft: 7 * PIXEL_RATE,
    width: 40 * PIXEL_RATE,
    height: 40 * PIXEL_RATE_Y,
    marginTop: 12 * PIXEL_RATE,
    borderRadius: 20 * PIXEL_RATE
  },
  triangle: {
      width: 0,
      height: 0,
      borderWidth: 15 * PIXEL_RATE,
      borderLeftWidth: 0,
      borderRightColor: 'white',
      borderTopColor: 'transparent',
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent',
      marginTop: 18 * PIXEL_RATE,
      marginLeft: 4 * PIXEL_RATE
  },
  contentContainer: {
      width: 300 * PIXEL_RATE,
      backgroundColor: 'white',
      borderBottomWidth: 20 * PIXEL_RATE,
      borderBottomColor: 'white'
  },
  name: {
    marginLeft: 15 * PIXEL_RATE, 
    marginTop: 15 * PIXEL_RATE, 
    fontSize: 16 * PIXEL_RATE, 
    color: '#101010', 
    fontWeight: 'bold'
  },
  date: {
      marginTop: 14 * PIXEL_RATE_Y,
      marginLeft: 155 * PIXEL_RATE,
      fontSize: 12 * PIXEL_RATE,
      color: '#101010'
  },
  label: {
    flexDirection: 'row',
    marginTop: 17 * PIXEL_RATE,
    marginLeft: 15 * PIXEL_RATE
  },
  article: {
      marginLeft: 15 * PIXEL_RATE,
      marginRight: 20 * PIXEL_RATE,
      marginTop: 16 * PIXEL_RATE_Y
  },
  photo: {
      marginTop: 10 * PIXEL_RATE_Y,
      marginLeft: 10 * PIXEL_RATE,
      width: 276 * PIXEL_RATE,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
  },
  image_little: {
      width: 86 * PIXEL_RATE,
      height: 86 * PIXEL_RATE_Y,
      marginBottom: 8 * PIXEL_RATE_Y
  },
  image_big: {
      width: 190 * PIXEL_RATE,
      height: 190 * PIXEL_RATE_Y,
      marginBottom: 8 * PIXEL_RATE_Y
  },
  icon: {
      flexDirection: 'row',
        marginLeft: 219 * PIXEL_RATE,
        marginTop: 2 * PIXEL_RATE_Y
  },
  commentlist: {
      marginTop: 10 * PIXEL_RATE_Y,
      marginLeft: 20 * PIXEL_RATE,

  }
});