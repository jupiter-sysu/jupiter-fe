import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { observer, inject } from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';


const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;

const Listhead = ({
  label, title, intro, photo
}) => {
  return (
    <View>
    <Image
      source={{uri: photo}}
      style={styles.headbackground}
    />
    <View style={styles.container2}>
      <View style={styles.label}>
        {
          label.map((l) => {
            return <Text style={{fontSize: 14 * PIXEL_RATE, color: '#B5B5B5'}}>#{l}# </Text>
          })
        }
      </View>
      <Text style={styles.title}>
        {title}
      </Text>
      <Text style={styles.intro}>
        {intro}
      </Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    width: 375 * PIXEL_RATE,
    height: 100 * PIXEL_RATE_Y,
    backgroundColor: 'white'
  },
  label: {
    flexDirection: 'row',
    marginTop: 9 * PIXEL_RATE,
    marginLeft: 18 * PIXEL_RATE
  },
  title: {
    fontSize: 28 * PIXEL_RATE,
    marginTop: 10 * PIXEL_RATE,
    marginLeft: 18 * PIXEL_RATE
  },
  intro: {
    fontSize: 12 * PIXEL_RATE,
    color: '#737373',
    marginTop: 7 * PIXEL_RATE,
    marginLeft: 18 * PIXEL_RATE
  },
  headbackground: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    height: 241 * PIXEL_RATE_Y,
    width: 375 * PIXEL_RATE,
    zIndex: -100,
},
});

export default observer(Listhead);