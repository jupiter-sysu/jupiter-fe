import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Router from './Router';
import store from './src/redux/store/store';

export default class jupiterFE extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}

AppRegistry.registerComponent('jupiterFE', () => Router);
