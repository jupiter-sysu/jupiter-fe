import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';


export default function Error() {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/404.png')} />
      <Text style={styles.text}>暂未开发</Text>
    </View>
  );
}

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

