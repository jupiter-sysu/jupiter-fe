import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity, SectionList, Animated, } from 'react-native';
import { inject, observer } from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

import Item from './component/Item';
import Category from './component/Category';
import MCSpinner from '../../component/Feedback/MCSpinner';
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
  }
  
  componentDidMount() {
    console.log(this.props.experience.currentHeaderPic);
    this.props.experience.loadPage();
    this.props.experience.setHeaderSearchBar(false);
    this.props.setStatusBar('light-content');
  }

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
        console.log(e.nativeEvent.contentOffset.y);
        if (e.nativeEvent.contentOffset.y > 10) {
          this.props.setStatusBar('dark-content');
        }
        if (e.nativeEvent.contentOffset.y >= 168) {
          this.props.experience.setHeaderSearchBar(true);
        }
      } else {
        if (e.nativeEvent.contentOffset.y < 20) {
          this.props.setStatusBar('light-content');
        }
        if (e.nativeEvent.contentOffset.y <= 168) {
          this.props.experience.setHeaderSearchBar(false);
        }
      }
      offset = e.nativeEvent.contentOffset.y;
    }
  })();

   render() {
     let interpolatedColor = this.state.animatedValue.interpolate({
       inputRange: [0, 100],
       outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
       extrapolate: 'clamp'
     });

     let interpolatedRadius = this.state.animatedValue.interpolate({
       inputRange: [168, 200],
       outputRange: [50 * PIXEL_RATE, 0],
       extrapolate: 'clamp'
     });

     let interpolatedWidth = this.state.animatedValue.interpolate({
       inputRange: [168, 200],
       outputRange: [340 * PIXEL_RATE, Dimensions.get('screen').width],
       extrapolate: 'clamp'
     });
     
     let interpolatedHeight = this.state.animatedValue.interpolate({
       inputRange: [168, 200],
       outputRange: [50 * PIXEL_RATE, 46 * PIXEL_RATE],
       extrapolate: 'clamp'
     });

     let interpolatedML = this.state.animatedValue.interpolate({
       inputRange: [168, 200],
       outputRange: [(Dimensions.get('screen').width - 350 * PIXEL_RATE) / 2, 0],
       extrapolate: 'clamp'
     });

     let interpolatedBorderColor = this.state.animatedValue.interpolate({
       inputRange: [180, 220],
       outputRange: ['rgba(80, 80, 80, 0)', 'rgba(80, 80, 80, 1)'],
       extrapolate: 'clamp'
     });

     let event = Animated.event([
       {
         nativeEvent: {
           contentOffset: {
             y: this.state.animatedValue
           }
         }
       }
     ]);

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
       <Animated.View style={{
         backgroundColor: interpolatedColor,
         width: '100%',
         height: 22,
         zIndex: 100,
         position: 'absolute',
         top: 0,
       }} />
         {this.props.experience.showHeaderSearchBar ? 
           <TouchableOpacity
             onPress={() => {

             }}
             activeOpacity={1}
             style={{
               zIndex: 100,
               alignItems: 'center',
             }}
           >
             <Animated.View
               style={[styles.inputContainer,{
                 borderRadius: interpolatedRadius,
                 width: interpolatedWidth,
                 height: interpolatedHeight,
                //  marginLeft: interpolatedML,
               }]}
             >
               <Animated.View style={{
                 borderWidth: 1,
                 borderColor: interpolatedBorderColor,
                 width: '90%',
                 height: '70%',
                 borderRadius: 20,
                 paddingLeft: 12 * PIXEL_RATE,
                 justifyContent: 'flex-start',
                 alignItems: 'center',
                 flexDirection: 'row',
                 position: 'relative',
                 
               }}>
                 <Ionicons name="ios-search" size={20} style={{ marginTop: 2 * PIXEL_RATE, marginRight: 10 * PIXEL_RATE }} />
                 <Text style={{
                 }}>搜索目的地、体验</Text>
               </Animated.View>
             </Animated.View>
           </TouchableOpacity>
           : null
        }
			 <SectionList
         onScroll={this.handleScroll}
         scrollEventThrottle={16}
         showsVerticalScrollIndicator={false}
				 renderItem={({ item, index, section }) => {
           return (
             <View style={styles.sectionContainer}>
               <View style={styles.itemsContainer}>
                 {
                   item.map((item, index) => (
                     <Item {...item} key={'discovery' + index} />
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
         stickySectionHeadersEnabled={false}
				 ListHeaderComponent={<Header photo={this.props.experience.headerPhoto} />}
         sections={this.props.experience.section}
				 keyExtractor={(item, index) => item + index}
			 />
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
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginLeft: (Dimensions.get('screen').width - 340 * PIXEL_RATE) / 2,
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
  
});

