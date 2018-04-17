import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'mobx-react';
import Router from './Router';
import Test from './src/containers/Test';


import stores from './src/store';

export default function jupiterFE() {
  return (
    <Provider {...stores}>
      <Router />
    </Provider>
  );
}

AppRegistry.registerComponent('jupiterFE', () => jupiterFE);
