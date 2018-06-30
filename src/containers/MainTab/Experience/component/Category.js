import React from 'react';
import { Text, View, Image, StyleSheet, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const ItemTitle = styled.Text`
  margin-top: 6px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
  width: 160px;
`;
const ItemSubtitle = styled.Text`
  font-size: 11px;
  color: #424242;
  margin-bottom: 10px;
  width: 160px;
  line-height: 16px;
`;


const COLOR = [
  'rgba(94,120,139, 0.5)',
  'rgba(239,89,105,0.5)',
  'rgba(169,237,231,0.5)',
  'rgba(245,204,63,0.5)',
  'rgba(199,75,88,0.5)',
  'rgba(174,228,106,0.5)',
];
const PIXEL_RATE = Dimensions.get('screen').width / 375;

const Category = ({
  feature_id, photo, category, index,
}) => (
  <TouchableOpacity
    activeOpacity={1}
    onPress={() => console.log(feature_id)}
    style={styles.itemContainer}
  >
    <View style={{
        backgroundColor: COLOR[index],
        width: 140 * PIXEL_RATE,
        height: 90 * PIXEL_RATE,
        position: 'absolute',
        left: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    }}
    >
      <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 18 }}>{category}</Text>
    </View>
    <Image source={{ uri: photo }} style={styles.itemPic} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemContainer: {
    width: 140 * PIXEL_RATE,
    borderWidth: 0,
    borderColor: 'red',
    // marginLeft: (Dimensions.get('screen').width - 170 * 2) / 2,
    // marginRight: (Dimensions.get('screen').width - 170 * 2) / 2,
    marginRight: 8,
  },
  itemPic: {
    width: 140 * PIXEL_RATE,
    height: 90 * PIXEL_RATE,
  },
});

export default observer(Category);
