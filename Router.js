import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Error from './src/app-config/containers';
import { THEME_PRIMARY_COLOR } from './src/common-style/theme';

let TABSTATE = '首页';
let HEADER_VISIBLE = true;


// invoke when tab is changing
function changeTabTitle(op) {
  if (op === 1) {
    TABSTATE = '首页';
    HEADER_VISIBLE = true;
  } else if (op === 2) {
    TABSTATE = '第二页';
    HEADER_VISIBLE = true;
  } else if (op === 3) {
    TABSTATE = '第三页';
    HEADER_VISIBLE = true;
  }
}

const Maintab = TabNavigator({
  Dashboard: {
    screen: Error,
    navigationOptions: {
      tabBarLabel: '我的业务',
      tabBarIcon: ({ focused }) => (
        <Ionicons name={focused ? 'ios-list-box' : 'ios-list-box-outline'} size={26} style={focused ? { color: THEME_PRIMARY_COLOR } : { color: '#7b7b7d' }} />
      ),
      labelStyle: {
        fontSize: 20,
      },
      tabBarOnPress: ({ scene, jumpToIndex }) => {
        changeTabTitle(1);
        jumpToIndex(scene.index);
      },
    },
  },
  Officehall: {
    screen: Error,
    navigationOptions: {
      tabBarLabel: '办事大厅',
      tabBarIcon: ({ focused }) => (
        <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} size={26} style={focused ? { color: THEME_PRIMARY_COLOR } : { color: '#7b7b7d' }} />
      ),
      labelStyle: {
        fontSize: 20,
      },
      tabBarOnPress: ({ scene, jumpToIndex }) => {
        changeTabTitle(2);
        jumpToIndex(scene.index);
      },
    },

  },
  Mine: {
    screen: Error,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ focused }) => (
        <Ionicons name={focused ? 'ios-person' : 'ios-person-outline'} size={26} style={focused ? { color: THEME_PRIMARY_COLOR } : { color: '#7b7b7d' }} />
      ),
      tabBarOnPress: ({ scene, jumpToIndex }) => {
        changeTabTitle(3);
        jumpToIndex(scene.index);
      },
    },
  },
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 13,
      paddingBottom: 2,
      margin: 0,
    },
    indicatorStyle: {
      height: 0,
    },
    showIcon: true,
    activeTintColor: THEME_PRIMARY_COLOR,
    inactiveTintColor: '#7b7b7d',
    style: {
      backgroundColor: '#f5f5f5',
      paddingBottom: 0,
    },
  },
  swipeEnabled: false,
  initialRouteName: 'Officehall',
  tabBarPosition: 'bottom',

});

const Main = StackNavigator({
  index: {
    screen: Maintab,
    navigationOptions: () => {
      if (HEADER_VISIBLE) {
        return {
          title: TABSTATE,
          headerMode: 'none',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: THEME_PRIMARY_COLOR,
            elevation: 0,
          },

          headerBackTitle: null,
          headerTitleStyle: {
            fontSize: 24,
          },
        };
      }
      return {
        header: null,
      };
    },
  },
  error: {
    screen: Error,
    navigationOptions: () => ({
      title: '此路不通',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: THEME_PRIMARY_COLOR,
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerBackTitle: null,
      headerTitleStyle: {
        fontSize: 24,
      },
    }),
  },
}, {
  headerMode: 'float',
  mode: 'card',

  transitionConfig: () => (Platform.OS === 'ios' ? {} : {
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [layout.initWidth, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
        outputRange: [0, 1, 1, 0.3, 0],
      });

      return { opacity, transform: [{ translateX }] };
    },
  }),
});


export default function Router() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={THEME_PRIMARY_COLOR} />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
