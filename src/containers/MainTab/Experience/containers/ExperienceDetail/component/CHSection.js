import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;

class CHSection extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    const {title, titleStyle, containerStyle, seperatorStyle, } = this.props;
    return (
      <View style={styles.container}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <View style={[{marginVertical: 10 * PIXEL_RATE_Y,}, containerStyle]}>
          {this.props.children}
        </View>
        <View style={[styles.seperator, seperatorStyle]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '86%',
    marginVertical: 20 * PIXEL_RATE_Y,
  },
  title: {
    fontSize: 18,
  },
  seperator: {
    borderWidth: StyleSheet.hairlineWidth,
    opacity: 0.38,
    borderColor: '#BBBBBB',
    marginTop: 10,
  },
});

export default CHSection;
