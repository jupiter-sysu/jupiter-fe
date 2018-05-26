import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';


const PIXEL_RATE = Dimensions.get('screen').width / 375;

const Header = ({
  photo, experience,
}) => {
  return (
    <View style={{ }}>
      <Image source={{ uri: photo }} style={styles.headerPic} />
      {experience.showOriginalSearchBar ?
        <TouchableOpacity
          onPress={() => {

        }}
          activeOpacity={1}
          style={
          {
            alignItems: 'center',
          }
        }
        >
          <View
            style={styles.inputContainer}
          >
            <Ionicons name="ios-search" size={20} style={{ marginTop: 2 * PIXEL_RATE, marginRight: 10 * PIXEL_RATE }} />
            <Text>搜索目的地、体验</Text>
          </View>
        </TouchableOpacity>
      :
        <TouchableOpacity
          onPress={() => {

        }}
          activeOpacity={1}
          style={
          {
            alignItems: 'center',
          }
        }
        >
          <View
            style={[styles.inputContainer, {
            opacity: 0,
          }]}
          >
            <Ionicons name="ios-search" size={20} style={{ marginTop: 2 * PIXEL_RATE, marginRight: 10 * PIXEL_RATE }} />
            <Text>搜索目的地、体验</Text>
          </View>
        </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
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
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
});

export default inject(stores => ({
  experience: stores.experience,
}))(observer(Header));
