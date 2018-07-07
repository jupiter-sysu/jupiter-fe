import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

import MCPhoto from '../../../../../../../../component/Photo/MCPhoto';

const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;

const Comment = ({
    profilePicture, name, level, date, label, article, photo, experience, id, navigation, likenum, commentnum
}) => {
  return (
    <View style={styles.container}>
        <Image source={{uri: profilePicture}} style={styles.profilePicture} />
        <View style={styles.triangle} />
        <TouchableOpacity 
            style={styles.contentContainer}
            onPress={() => {
                experience.setCommentID(id);
                navigation.navigate('commentdetail');
            }}
            activeOpacity={0.9}
        >
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.date}>{date.slice(0, date.indexOf(' '))}</Text>
                </View>
                <View style={{marginLeft: 20 * PIXEL_RATE, flexDirection: 'row'}}>
                    <Ionicons name="ios-star" size={15 * PIXEL_RATE} style={{color: '#101010'}}/>
                    {
                        ['','','','',''].map((item, index) => {
                            if (index < level-1) {
                                return <Ionicons name="ios-star" size={15 * PIXEL_RATE} style={{color: '#101010', marginLeft: 5 * PIXEL_RATE}}/>
                            }
                        })
                    }
                </View>
                <View style={styles.label}>
                    {
                        label.map((l) => {
                            return <Text style={{fontSize: 14 * PIXEL_RATE, color: '#BEC2C9'}}>#{l}# </Text>
                        })
                    }
                </View>
                <Text style={styles.article}>
                    {article}
                </Text>
                <View 
                    style={styles.photo}
                    
                >
                {
                    photo.length === 1 ?
                    <MCPhoto style={styles.image_big} uri={photo[0]} />
                    :
                    photo.map((p) => {
                        return (
                        <MCPhoto style={styles.image_little} uri={p} containerStyle={styles.photoContainer} />
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
                            bottom: -4 * PIXEL_RATE_Y,
                            right: -8 * PIXEL_RATE,
                            fontSize: 10 * PIXEL_RATE,
                            
                        }}>{likenum}</Text>
                    </View>
                    
                    <View style={{
                        marginLeft: 18 * PIXEL_RATE,
                        width: 24,
                        height: 24,
                    }}>
                        <Ionicons name='md-chatbubbles' size={24 * PIXEL_RATE} style={{color: '#101010'}}/>
                        <Text style={{
                            position: 'absolute',
                            bottom: -4 * PIXEL_RATE_Y,
                            right: -6 * PIXEL_RATE,
                            fontSize: 10 * PIXEL_RATE
                        }}>{commentnum}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 375 * PIXEL_RATE,
    flexDirection: 'row',
    marginTop: 10 * PIXEL_RATE,
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
      borderBottomColor: 'white',
      
  },
  name: {
    marginLeft: 15 * PIXEL_RATE, 
    marginTop: 15 * PIXEL_RATE, 
    fontSize: 16 * PIXEL_RATE, 
    color: '#101010', 
    fontWeight: 'bold',
    flex: 1,
  },
  date: {
      marginTop: 14 * PIXEL_RATE_Y,
      width: 80 * PIXEL_RATE_Y,
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
    //   justifyContent: 'space-between'
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
    photoContainer: {
        marginRight: 20 * PIXEL_RATE,
    }
});

export default inject(stores=> ({
    experience: stores.experience,
}))(observer(Comment));