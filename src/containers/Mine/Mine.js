import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';

@inject(['user'])
@observer
class Mine extends Component {

   render() {
     return (
       <View style={styles.container}>
         <TouchableOpacity
            onPress={() => {
              this.props.user.logout();
              this.props.navigation.navigate('welcome');
            }}
            style={{
              borderRadius: 6,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              width: 120,
              height: 40,
            }}
         >
           <Text style={{
             color: '#FFF',
             fontSize: 16
           }}>注销</Text>
         </TouchableOpacity>
       </View>
     );
   }
}

export default Mine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4e8eb',
  }
});

