import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';

@observer
class Note extends Component {

   render() {
     return (
       <View style={styles.container}>
         <Text>游记</Text>
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

