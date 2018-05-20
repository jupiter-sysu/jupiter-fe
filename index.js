import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'mobx-react';


import Router from './Router';


import stores from './src/store';

// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
  GLOBAL.originalXMLHttpRequest :
  GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};

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
