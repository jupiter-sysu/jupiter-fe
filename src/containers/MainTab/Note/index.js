import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, SectionList, StatusBar } from 'react-native';
import { inject, observer } from 'mobx-react';

const Header = () => {
  return (
    <View style={{backgroundColor: 'red'}}>
      <Text>大傻逼 太搞笑</Text>
    </View>
  )
}

@observer
class Note extends Component {

   render() {
     const overrideRenderItem = ({ item, index, section: { title, data } }) => <Text key={index}>Override{item}</Text>
     return (
       <View style={{paddingTop: 22}}>
       </View>
       
     );
   }
}

export default Note;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4e8eb',
  }
});

