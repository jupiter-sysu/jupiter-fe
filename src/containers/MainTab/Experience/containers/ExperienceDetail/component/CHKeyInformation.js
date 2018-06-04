import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class CHKeyInformation extends Component {
  render() {
    const { text } = this.props;

    const item = text.replace(/[\r\n]/g, '').split('[-]');

    const componentItem = item.map((item) => {
      if (item) {
        return (
          <View style={{ flexDirection: 'row', marginVertical: 7 }}>
            <Ionicons name="ios-star" size={15} style={{ paddingRight: 10 }} />
            <Text style={{ fontSize: 14, lineHeight: 25 }}>{item}</Text>
          </View>
        );
      }
    });

    return componentItem;
  }
}
