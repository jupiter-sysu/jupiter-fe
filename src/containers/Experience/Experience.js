import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

import Item from './component/Item';
import MCSpinner from '../../component/Feedback/MCSpinner';

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
`;
const Subtitle = styled.Text`
  font-size: 13px;
  color: #424242;
  margin-bottom: 14px;
`;

const PIXEL_RATE = Dimensions.get('screen').width / 375;

@inject(stores => ({
  experience: stores.experience,
}))
@observer
class Experience extends Component {

  componentDidMount() {
    console.log(this.props.experience.currentHeaderPic);
    this.props.experience.loadPage();
  }

   render() {
     if (this.props.experience.isIniting) {
       return (
         <View style={styles.container}>
           <StatusBar barStyle="light-content" />
           <MCSpinner isVisible={this.props.experience.isIniting} type="no-background" />
         </View>
       )
     }
     return (
       <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
         <StatusBar barStyle="light-content" />
         <Image source={{ uri: String(this.props.experience.currentHeaderPic)}} style={styles.headerPic} />
         <TouchableOpacity 
          onPress={() => {

          }}
          activeOpacity={1}
         >
           <View
             style={styles.inputContainer}
           >
             <Ionicons name="ios-search" size={24} style={{ marginTop: 2 * PIXEL_RATE, marginRight: 10 * PIXEL_RATE }}/>
             <Text>搜索目的地、体验</Text>
           </View>
         </TouchableOpacity>
         
         <View style={[styles.sectionContainer, {marginTop: 10}]}>
           <Title>{this.props.experience.currentDiscovery === null ? '' : this.props.experience.currentDiscovery.title}</Title>
           <Subtitle>{this.props.experience.currentDiscovery === null ? '' : this.props.experience.currentDiscovery.subtitle}</Subtitle>
           <View style={styles.itemsContainer}>
             {
               this.props.experience.currentDiscovery === null ?
               null 
                 : this.props.experience.currentDiscovery.items.map((item, index) => {
                   return (
                     <Item {...item} key={'discovery' + index} />
                   )
                 })
             }
           </View>
           </View>
       </ScrollView>
     );
   }
}

export default Experience;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerPic: {
    width: '100%',
    height: 210 * PIXEL_RATE,
    borderWidth: 0,
    borderColor: 'red',
  },
  inputContainer: {
    position: 'relative',
    bottom: 20 * PIXEL_RATE,
    height: 50 * PIXEL_RATE,
    width: 340 * PIXEL_RATE,
    borderRadius: 50 * PIXEL_RATE,
    backgroundColor: '#FFF',
    paddingLeft: 30 * PIXEL_RATE,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    shadowOffset: { width: 1, height: 1, },
    shadowColor: 'black',
    shadowOpacity: .2,
  },
  contentContainer: {
    alignItems: 'center',
  },
  sectionContainer: {
    width: '100%',
    paddingLeft: 16 * PIXEL_RATE,
    borderWidth: 0,
    borderColor: 'red',
  },
  itemsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: -16 * PIXEL_RATE,
  },
});

