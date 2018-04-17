import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "mobx-react";
import { observer, inject } from "mobx-react";
import Form, {form} from './Form';

// 作为测试使用的，暂时不用管

@observer // 监听当前组件
class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <View style={styles.container}>
        <Form form={form} />
      </View>
    );
  }
}

export default HomeScreen;

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
