import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Platform, StyleSheet, View, StatusBar, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TabBar from './src/component/Navigation/MCTabBar';


// import containers
import Error from './src/containers/Error/Error';
//= =====================Sprint 1======================
import Welcome from './src/containers/Welcome/Welcome';
import Login from './src/containers/Login/Login';
import Signup from './src/containers/Signup/Signup';
import SignupIDCode from './src/containers/Signup/Signup-IDCode';
import FindPasswordPhone from './src/containers/Login/FindPassword-Phone';
import FindPasswordIDCode from './src/containers/Login/FindPassword-IDCode';
import FindPasswordPassword from './src/containers/Login/FindPassword-Password';
//= =====================Test======================
import Test from './src/containers/Test';


import { THEME_PRIMARY_COLOR } from './src/common-style/theme';

let TABSTATE = '体验';
let HEADER_VISIBLE = false;


// invoke when tab is changing
function changeTabTitle(op) {
  if (op === 1) {
    TABSTATE = '体验';
    HEADER_VISIBLE = false;
  } else if (op === 2) {
    TABSTATE = '游记';
    HEADER_VISIBLE = false;
  } else if (op === 3) {
    TABSTATE = '行程单';
    HEADER_VISIBLE = false;
  } else if (op === 4) {
    TABSTATE = '我的';
    HEADER_VISIBLE = false;
  }
}

const Maintab = TabNavigator({
  Experience: {
    screen: Error,
    navigationOptions: {
      tabBarLabel: '体验',
      tabBarIcon: ({ focused }) => {
        if (focused) {
          return (
            <Image
              source={require('./src/app-assets/nav/fill/1.png')}
            />
          );
        }
        return (
          <Image
            source={require('./src/app-assets/nav/outline/1.png')}
          />
        );
      },
      labelStyle: {
        fontSize: 20,
      },
      tabBarOnPress: ({ scene, jumpToIndex }) => {
        changeTabTitle(1);
        jumpToIndex(scene.index);
      },
    },
  },
  Notes: {
    screen: Error,
    navigationOptions: {
      tabBarLabel: '游记',
      tabBarIcon: ({ focused }) => {
        if (focused) {
          return (
            <Image
              source={require('./src/app-assets/nav/fill/2.png')}
            />
          );
        }
        return (
          <Image
            source={require('./src/app-assets/nav/outline/2.png')}
          />
        );
      },
      labelStyle: {
        fontSize: 20,
      },
      tabBarOnPress: ({ scene, jumpToIndex }) => {
        changeTabTitle(2);
        jumpToIndex(scene.index);
      },
    },

  },
  Schedule: {
    screen: Error,
    navigationOptions: {
      tabBarLabel: '行程',
      tabBarIcon: ({ focused }) => {
        if (focused) {
          return (
            <Image
              source={require('./src/app-assets/nav/fill/3.png')}
            />
          );
        }
        return (
          <Image
            source={require('./src/app-assets/nav/outline/3.png')}
          />
        );
      },
      tabBarOnPress: ({ scene, jumpToIndex }) => {
        changeTabTitle(3);
        jumpToIndex(scene.index);
      },
    },
  },
  Mine: {
    screen: Error,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ focused }) => {
        if (focused) {
          return (
            <Image
              source={require('./src/app-assets/nav/fill/4.png')}
            />
          );
        }
        return (
          <Image
            source={require('./src/app-assets/nav/outline/4.png')}
          />
        );
      },
      tabBarOnPress: ({ scene, jumpToIndex }) => {
        changeTabTitle(4);
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
    activeTintColor: '#7b7b7d',
    inactiveTintColor: '#7b7b7d',
    style: {
      backgroundColor: '#f5f5f5',
      paddingBottom: 0,
    },
  },
  tabBarComponent: TabBar,
  swipeEnabled: false,
  initialRouteName: 'Experience',
  tabBarPosition: 'bottom',

});

export const Main = StackNavigator({
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
  welcome: {
    screen: Welcome,
    navigationOptions: () => ({
      title: '欢迎',
      headerTintColor: 'white',
      headerStyle: {
        display: 'none',
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
  signup: {
    screen: Signup,
    navigationOptions: () => ({
      title: '注册',
      headerTintColor: 'white',
      headerStyle: {
        display: 'none',
      },
      headerBackTitle: null,
      headerTitleStyle: {
        fontSize: 24,
      },
    }),
  },
  login: {
    screen: Login,
    navigationOptions: () => ({
      title: '登录',
      headerTintColor: 'white',
      headerStyle: {
        display: 'none',

      },
      headerBackTitle: null,
      headerTitleStyle: {
        fontSize: 24,
      },
    }),
  },
  FindPasswordPhone: {
    screen: FindPasswordPhone,
    navigationOptions: () => ({
      title: '忘记密码',
      headerTintColor: 'white',
      headerStyle: {
        display: 'none',

      },
      headerBackTitle: null,
      headerTitleStyle: {
        fontSize: 24,
      },
    }),
  },
  findpasswordidcode: {
    screen: FindPasswordIDCode,
    navigationOptions: () => ({
      title: '忘记密码',
      headerTintColor: 'white',
      headerStyle: {
        display: 'none',

      },
      headerBackTitle: null,
      headerTitleStyle: {
        fontSize: 24,
      },
    }),
  },
  findpasswordpassword: {
    screen: FindPasswordPassword,
    navigationOptions: () => ({
      title: '输入新密码',
      headerTintColor: 'white',
      headerStyle: {
        display: 'none',

      },
      headerBackTitle: null,
      headerTitleStyle: {
        fontSize: 24,
      },
    }),
  },
  signupidcode: {
    screen: SignupIDCode,
    navigationOptions: () => ({
      title: '验证码',
      headerTintColor: 'white',
      headerStyle: {
        display: 'none',

      },
      headerBackTitle: null,
      headerTitleStyle: {
        fontSize: 24,
      },
    }),
  },
  test: {
    screen: Test,
    navigationOptions: () => ({
      title: '登录',
      headerTintColor: 'white',
      headerStyle: {
        display: 'none',

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
  initialRouteName: 'welcome',
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
      <StatusBar barStyle="dark-content" backgroundColor={THEME_PRIMARY_COLOR} />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
