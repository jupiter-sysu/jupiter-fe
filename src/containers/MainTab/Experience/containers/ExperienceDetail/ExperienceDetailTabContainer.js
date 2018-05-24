import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { inject, observer,  } from 'mobx-react';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Experience from './tabContainers/Experience';
import Comments from './tabContainers/Comments';

const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;

@inject(stores => ({
    experience: stores.experience
}))
@observer
class ExperienceDetailTabContainer extends Component {

    componentDidMount() {
        // 请求资源
        
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.experience.currentTab === 1 ? 
                    <Experience navigation={this.props.navigation}/>
                    : <Comments navigation={this.props.navigation}/> }
            </View>
        )
    }
}

export default ExperienceDetailTabContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center'
    },

});

