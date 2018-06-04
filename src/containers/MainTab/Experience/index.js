import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, StatusBar, ScrollView, Dimensions, Modal, TextInput, TouchableOpacity, SectionList, Animated, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import infoLog from 'infoLog';

import Item from './component/Item';
import Category from './component/Category';
import MCSpinner from '../../../component/Feedback/MCSpinner';
import Header from './component/Header';

const Title = styled.Text`
  font-size: 24px;
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
  setStatusBar: stores.tab.setStatusBar,
  tab: stores.tab,
}))
@observer
class Experience extends Component {

  constructor(props) {
    super(props);
    this.state={
      animatedValue: new Animated.Value(0),
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }
  
  componentDidMount() {
    console.log(this.props.experience.currentHeaderPic);
    this.props.experience.loadPage();
    this.props.experience.setHeaderSearchBar(false);
    this.props.setStatusBar('light-content');
  }

  handleRefresh() {
    console.log('refresh');
    this.props.experience.loadPage();
  }

  _onViewableItemsChanged = (info: {
    changed: Array<{
      key: string,
      isViewable: boolean,
      item: any,
      index: ?number,
      section?: any,
    }>
  }
  ) => {
    // Impressions can be logged here
    if (false) {
      infoLog(
        'onViewableItemsChanged: ',
        info.changed.map((v) => ({ ...v, item: '...' })),
      );
    }
  };

  handleScroll = (() => {
    let offset = 0;
    return (e) => {
      Animated.event([
        {
          nativeEvent: {
            contentOffset: {
              y: this.state.animatedValue
            }
          }
        }
      ])(e);
      if (e.nativeEvent.contentOffset.y >  offset) {
        if (e.nativeEvent.contentOffset.y > 10) {
          this.props.setStatusBar('dark-content');
        }
        if (e.nativeEvent.contentOffset.y >= 168 * PIXEL_RATE) {
          this.props.experience.setHeaderSearchBar(true);
          this.props.experience.setOriginalSearchBar(false);
        }
      } else {
        if (e.nativeEvent.contentOffset.y < 20) {
          this.props.setStatusBar('light-content');
        }
        if (e.nativeEvent.contentOffset.y <= 168 * PIXEL_RATE) {
          this.props.experience.setHeaderSearchBar(false);
          this.props.experience.setOriginalSearchBar(true);
        }
      }
      offset = e.nativeEvent.contentOffset.y;
    }
  })();

   render() {
     let interpolatedColor = this.state.animatedValue.interpolate({
       inputRange: [0, 100 * PIXEL_RATE],
       outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
       extrapolate: 'clamp'
     });

     let interpolatedRadius = this.state.animatedValue.interpolate({
       inputRange: [168* PIXEL_RATE, 200 * PIXEL_RATE],
       outputRange: [50 * PIXEL_RATE, 0],
       extrapolate: 'clamp'
     });

     let interpolatedWidth = this.state.animatedValue.interpolate({
       inputRange: [168 * PIXEL_RATE, 230 * PIXEL_RATE],
       outputRange: [340 * PIXEL_RATE, Dimensions.get('screen').width],
       extrapolate: 'clamp'
     });
     
     let interpolatedHeight = this.state.animatedValue.interpolate({
       inputRange: [168 * PIXEL_RATE, 230 * PIXEL_RATE],
       outputRange: [50 * PIXEL_RATE, 46 * PIXEL_RATE],
       extrapolate: 'clamp'
     });

     let interpolatedML = this.state.animatedValue.interpolate({
       inputRange: [168 * PIXEL_RATE, 230 * PIXEL_RATE],
       outputRange: [(Dimensions.get('screen').width - 350 * PIXEL_RATE) / 2, 0],
       extrapolate: 'clamp'
     });

     let interpolatedBorderColor = this.state.animatedValue.interpolate({
       inputRange: [180 * PIXEL_RATE, 250 * PIXEL_RATE],
       outputRange: ['rgba(80, 80, 80, 0)', 'rgba(200, 200, 200, 1)'],
       extrapolate: 'clamp'
     });

     let interpolatedTextColor = this.state.animatedValue.interpolate({
       inputRange: [168 * PIXEL_RATE, 200 * PIXEL_RATE],
         outputRange: ['rgba(00, 0, 0, 1)', 'rgba(200, 200, 200, 1)'],
         extrapolate: 'clamp'
     });

     let interpolatedMT = this.state.animatedValue.interpolate({
       inputRange: [168 * PIXEL_RATE, 200 * PIXEL_RATE],
         outputRange: [3, -10],
         extrapolate: 'clamp'
     });
     

     if (this.props.experience.isIniting) {
       return (
         <View style={styles.container}>
           <StatusBar barStyle={this.props.tab.statusBarStyle} />
           <MCSpinner isVisible={this.props.experience.isIniting} type="no-background" />
         </View>
       )
     }
     return (
		<View style={styles.container}>
       <StatusBar barStyle={this.props.tab.statusBarStyle} />
       <Modal
           animationType="slide"
           transparent={false}
           visible={this.props.experience.modalVisible}
           onRequestClose={() => {
             alert('Modal has been closed.');
           }}>
           <View style={styles.modalHeaderContainer}>
              <TouchableOpacity onPress={() => {
                this.props.experience.setModalVisible(false);
              }}>
                 <Ionicons name='ios-arrow-back' size={30 * PIXEL_RATE} style={{marginTop: 2, marginRight: 10, color: 'black', backgroundColor: 'rgba(0,0,0,0)'}} />
              </TouchableOpacity>
              <TextInput
                onSubmitEditing={() => {
                  this.props.experience.handleSearch();
                }}
                returnKeyType="search"
                clearButtonMode="while-editing"
                value={this.props.experience.searchValue.slice}
                onChangeText={(text) => this.props.experience.changeSearchValue(text)}
                underlineColorAndroid='transparent' 
                autoFocus={true}
                style={{
                  backgroundColor: '#FFFFFF',
                  size: 14,
                  paddingLeft: 10,
                  width: 312,
                  height: 34,
                }}
               placeholder="搜索目的地、玩法"
              />
           </View>
           <FlatList
            ListFooterComponent={() => {
              console.log(this.props.experience.searchHistory.slice());
              if (this.props.experience.searchHistory.slice().length !== 0) {
                return (
                  <TouchableOpacity 
                    onPress={() => {
                      this.props.experience.clearHistory();
                    }}
                    style={{
                    width: '100%',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: '#F8F8F8',
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: 'purple',
                    }}>清空历史记录</Text>
                  </TouchableOpacity>
                );
              }
              return null;
            }}
            data={this.props.experience.searchHistory}
            renderItem={({item}) => (
              <TouchableOpacity style={{
                width: '100%',
                height: 50,
                justifyContent: 'center',
                paddingLeft: 30,
                borderBottomWidth: 1,
                borderColor: '#F8F8F8',
              }}>
                <Text style={{
                  fontSize: 16,
                }}>{item.name}</Text>
              </TouchableOpacity>
          )}
           />
        </Modal>
       <Animated.View style={{
         backgroundColor: interpolatedColor,
         width: '100%',
         height: 23,
         zIndex: 101,
         position: 'absolute',
         top: 0,
       }} />
         {this.props.experience.showHeaderSearchBar ? 
           <TouchableOpacity
             activeOpacity={1}
             style={{
               zIndex: 100,
               alignItems: 'center',
              //  shadowOffset: { width: 0, height: 0 },
              //  shadowColor: 'black',
              //  shadowOpacity: .3,
             }}
           >
             <Animated.View
               style={[styles.inputContainer,{
                 borderRadius: interpolatedRadius,
                 width: interpolatedWidth,
                 height: interpolatedHeight,
                //  marginLeft: interpolatedML,
                 shadowOffset: { width: 0, height: 2 },
                 shadowColor: 'black',
                 shadowOpacity: .2,
                 elevation: 3,
               }]}
             >
                 <Animated.View style={{
                   borderWidth: .5,
                   borderColor: interpolatedBorderColor,
                   width: '90%',
                   height: '70%',
                   borderRadius: 20,
                   paddingLeft: 13 * PIXEL_RATE,
                   justifyContent: 'flex-start',
                   alignItems: 'center',
                   flexDirection: 'row',
                   position: 'relative',
                   marginTop: interpolatedMT,
                 }}>
                 <TouchableOpacity
                  onPress={() => {
                    this.props.experience.setModalVisible(true);
                    this.props.setStatusBar('dark-content');
                  }}
                  activeOpacity={1} 
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    flex: 1,
                 }}>
                   <Ionicons name="ios-search" size={20} style={{ color: 'rgba(200, 200, 200, 1)', marginTop: 2 * PIXEL_RATE, marginRight: 10 * PIXEL_RATE }} />
                   <Animated.Text style={{
                     color: interpolatedTextColor
                   }}>搜索目的地、体验</Animated.Text>
                 </TouchableOpacity>
                 </Animated.View>
             </Animated.View>
           </TouchableOpacity>
           : null
        }
			 <SectionList
         onScroll={this.handleScroll}
         scrollEventThrottle={16}
         onEndReached={() => this.handleRefresh()}
         showsVerticalScrollIndicator={false}
				 renderItem={({ item, index, section }) => {
           return (
             <View style={styles.sectionContainer}>
               <View style={styles.itemsContainer}>
                 {
                   item.map((item, index) => (
                     <Item {...item}  navigation={this.props.navigation} key={'discovery' + index} />
                   ))
                 }
               </View>
               {
                 section.categories === undefined ?
                   null
                   : <ScrollView
                     showsHorizontalScrollIndicator={false}
                     style={{ borderWidth: 0, borderColor: 'red'}}
                     horizontal={true}
                     contentContainerStyle={{
                       paddingLeft: 10,
                     }}
                   >
                     {section.categories.map((item, index) => {
                       return (
                         <Category {...item} index={index} />
                       )
                     })}
                   </ScrollView>
               }
             </View>
           )
           }}
         contentContainerStyle={{
            // alignItems: 'center',
         }}
          viewabilityConfig={{
             minimumViewTime: 3000,
             viewAreaCoveragePercentThreshold: 75,
             waitForInteraction: true,
          }}
         onViewableItemsChanged={this._onViewableItemsChanged}
				 renderSectionHeader={({ section: { title, subtitle, photo, id } }) => (
           <View>
             <View style={{ flexDirection: 'row', paddingLeft: 10, marginBottom: 4 }}>
               <View style={{ flex: 1 }}>
                 <Title>{title}</Title>
                 {subtitle !== undefined ?
                   <Subtitle>{subtitle}</Subtitle>
                   : null}
               </View>
               {subtitle === undefined ?
                 <TouchableOpacity 
                    style={{ justifyContent: 'center' }}
                    onPress={() => console.log(id)}
                 >
                   <Text style={{ marginRight: 14, fontSize: 14 }}>更多 ></Text>
                 </TouchableOpacity>
                 : null}
             </View>
             {photo !== undefined ?
               <TouchableOpacity 
                  style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }} 
                  activeOpacity={1}
                  onPress={() => console.log(id) }
               >
                 <Image source={{ uri: photo }} style={styles.cityPic} />
               </TouchableOpacity>
               : null}
           </View>
           
					 
         )}
         enableVirtualization={true}
         stickySectionHeadersEnabled={false}
				 ListHeaderComponent={<Header photo={this.props.experience.headerPhoto} />}
         sections={this.props.experience.section}
				 keyExtractor={(item, index) => item + index}
			 >
       </SectionList>
		</View> 
		
         
        
         
        //  <View style={[styles.sectionContainer, {marginTop: 10}]}>
        //    <Title>{this.props.experience.currentDiscovery === null ? '' : this.props.experience.currentDiscovery.title}</Title>
        //    <Subtitle>{this.props.experience.currentDiscovery === null ? '' : this.props.experience.currentDiscovery.subtitle}</Subtitle>
        //    <View style={styles.itemsContainer}>
        //      {
        //        this.props.experience.currentDiscovery === null ?
        //        null 
        //          : this.props.experience.currentDiscovery.items.map((item, index) => {
        //            return (
        //              <Item {...item} key={'discovery' + index} />
        //            )
        //          })
        //      }
        //    </View>
        //    </View>
		//  </ScrollView>
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
    position: 'absolute',
    top: 22,
    zIndex: 0,
    height: 50 * PIXEL_RATE,
    width: 340 * PIXEL_RATE,
    borderRadius: 50 * PIXEL_RATE,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: (Dimensions.get('screen').width - 340 * PIXEL_RATE) / 2,
    marginTop: 0,
  },
  contentContainer: {
    alignItems: 'center',
  },
  sectionContainer: {
    width: '100%',
    marginBottom: 40,
  },
  itemsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: (Dimensions.get('screen').width - 350 * PIXEL_RATE) / 2,
    width: 350 * PIXEL_RATE,
  },
  cityPic: {
    width: 350 * PIXEL_RATE,
    height: 140 * PIXEL_RATE,
  },
  modalHeaderContainer: {
    height: 64 * PIXEL_RATE,
    width: '100%',
    backgroundColor: '#F8F8F8',
    paddingTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
  
});

