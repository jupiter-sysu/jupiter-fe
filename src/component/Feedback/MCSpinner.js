import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { THEME_PRIMARY_COLOR } from './../../common-style/theme';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

// 菊花图
// =============
// porps说明
// >isVisible:boolean,是否显示
// >type: string,类型


function MCHeader(props) {
  const { isVisible, type} = props;
  if (type === 'no-background') {
    return (
      <Modal
        animationType="none"
        transparent
        visible={isVisible}
      >
        <View style={styles.modalContainerNoBaackground}>
          <View style={styles.modalSmallContainer}>
            <Bars size={18} color={THEME_PRIMARY_COLOR} />
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <Modal
      animationType="none"
      transparent
      visible={isVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalSmallContainer}>
          <Bars size={18} color={THEME_PRIMARY_COLOR} />
        </View>
      </View>
    </Modal>

  );
}

export default MCHeader;

const styles = StyleSheet.create({
  modalContainerNoBaackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalSmallContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },


});

