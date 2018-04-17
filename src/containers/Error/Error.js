import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';


function Error() {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/404.png')} />
      <Text style={styles.text}>你好</Text>
    </View>
  );
}

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4e8eb',
  },
  text: {
    color: '#677384',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
});

