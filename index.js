import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'mobx-react';


import Router from './Router';


import stores from './src/store';

export default class jupiterFE extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('jupiterFE', () => jupiterFE);
