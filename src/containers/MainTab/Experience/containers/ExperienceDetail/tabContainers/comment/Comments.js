import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Image } from 'react-native';
import { inject, observer, } from 'mobx-react';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Listhead from './component/Listhead'
import Comment from './component/Comment'

const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;

const tags = [];

@inject(stores => ({
    experience: stores.experience
}))
@observer
class Comments extends Component {

    componentDidMount() {
        // 请求资源
        this.props.experience.loadComment();
    }

    _header = () => {
        const { experience } = this.props;
        return <Listhead 
                    label={experience.currentComment=== null ? [] : experience.currentComment.tags} 
                    title={experience.currentComment=== null ? '' : experience.currentComment.experience_title}
                    intro={experience.currentComment=== null ? '' : experience.currentComment.experience_brief_decription}
                    photo={experience.currentComment=== null ? '' : experience.currentComment.cover_img}
                />;
    }

    render() {
        const { experience } = this.props;
        const { currentComment_reviews } = experience;
        if (this.props.experience.isCommentIniting) {
            return (
              <Text>loading</Text>
            )
        }

        return (
            <View style={styles.container}>
                <FlatList
                    onScroll={this.props.handleScroll}
                    onScrollEndDrag={this.props.endDrag}
                    onMomentumScrollEnd={this.props.onScrollEnd}
                    ListHeaderComponent={this._header}
                    data={currentComment_reviews}
                    renderItem={({item, index}) => (
                        <Comment
                            navigation={this.props.navigation}
                            profilePicture={currentComment_reviews=== null ? '' : item.user_profile_img}
                            id={item.review_id} 
                            style={{marginTop: 10 * PIXEL_RATE_Y}} 
                            name={currentComment_reviews=== null ? '' : item.user_name}
                            level={currentComment_reviews=== null ? 0 : Number(item.star_rank)}
                            date={currentComment_reviews=== null ? '' : item.review_date}
                            label={currentComment_reviews=== null ? [] : item.review_tags}
                            article={currentComment_reviews=== null ? '' : item.review_text}
                            photo={currentComment_reviews=== null ? [] : item.review_imgs}
                            likenum={currentComment_reviews=== null ? '' : item.like_num}
                            commentnum={currentComment_reviews=== null ? '' : item.comment_num}
                />
                    )}
                />
                
                
            </View>
        )
    }
}

export default Comments;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    Headercontainer: {
        height: 32 * PIXEL_RATE,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 28 * PIXEL_RATE_Y,
        zIndex: 100
    },
    backIcon: {
        position: 'absolute',
        left: 16 * PIXEL_RATE,
        width: 40 * PIXEL_RATE,
        alignItems: 'center',
        height: 30 * PIXEL_RATE,
    },
    optionContainer: {
        flex: 1,
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

});

