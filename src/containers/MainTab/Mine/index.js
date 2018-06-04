import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, StatusBar, ImageBackground, Dimensions, AsyncStorage } from 'react-native';
import { inject, observer } from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PIXEL_RATE = Dimensions.get('screen').width / 375;

@inject(stores => ({
  user: stores.user,
  tab: stores.tab,
}))
@observer
class Mine extends Component {

   render() {
     return (
       <View style={styles.container}>
          <ImageBackground 
            source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527400978816&di=8e026678165888ce2db08c2a16ed2a4a&imgtype=0&src=http%3A%2F%2Fp.chanyouji.cn%2F102365%2F1394486842356p18imtv97s17hrpp41m8gkpjsif1s.jpg'}}
            resizeMode="cover"
            style={styles.frontCover}
          >
              <Image
                  source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527365474674&di=42582ab126c6dfa585c2db21c810e81b&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201611%2F03%2F20161103082406_sjNkh.jpeg'}}
                  style={styles.head}
              >
              </Image>
              <View>
                  <Text style={styles.name}>
                      左左hh7216
                  </Text>
                  <View style={styles.star}>
                      <Ionicons name="ios-star" size={15 * PIXEL_RATE} style={{color: '#FFF'}}/>
                      <Ionicons name="ios-star" size={15 * PIXEL_RATE} style={{color: '#FFF'}}/>
                      <Ionicons name="ios-star" size={15 * PIXEL_RATE} style={{color: '#FFF'}}/>
                      <Ionicons name="ios-star" size={15 * PIXEL_RATE} style={{color: '#FFF'}}/>
                  </View>
              </View>
              <View style={styles.info}>
                  <View style={[styles.infodetail, {flex:1}]}>
                      <Text style={styles.infotext}>
                          关注
                      </Text>
                      <Text style={styles.infotext}>
                          5
                      </Text>
                  </View>
                  <View style={[styles.infodetail, {flex:1, borderColor: '#FFF', borderLeftWidth: 1, borderRightWidth: 1}]}>
                      <Text style={styles.infotext}>
                          粉丝
                      </Text>
                      <Text style={styles.infotext}>
                          120
                      </Text>
                  </View>
                  <View style={[styles.infodetail, {flex:1}]}>
                      <Text style={styles.infotext}>
                          消息
                      </Text>
                      <Text style={styles.infotext}>
                          2
                      </Text>
                  </View>
              </View>
          </ImageBackground>
          <View style={styles.mycollection}>
              <Ionicons name="ios-star-outline" size={20 * PIXEL_RATE} style={{color: '#73C7EB', marginLeft: 19 * PIXEL_RATE}}/>
              <Text style={{marginLeft: 14 * PIXEL_RATE, fontSize: 14 * PIXEL_RATE}}>
                      我的收藏
              </Text>
              <Ionicons name="ios-arrow-forward" size={23 * PIXEL_RATE} style={{color: '#A1A1A1', position: 'absolute', marginLeft: 338 * PIXEL_RATE}}/>
          </View>
          <View style={styles.myitems}>
              <View style={styles.items}>
                  <Ionicons name="ios-add-circle-outline" size={20 * PIXEL_RATE} style={{color: '#73C7EB', marginLeft: 19 * PIXEL_RATE}}/>
                  <Text style={{marginLeft: 14 * PIXEL_RATE, fontSize: 14 * PIXEL_RATE}}>
                      我创建的体验
                  </Text>
                  <Ionicons name="ios-arrow-forward" size={23 * PIXEL_RATE} style={{color: '#A1A1A1', position: 'absolute', marginLeft: 338 * PIXEL_RATE}}/>
              </View>
              <View style={styles.items}>
                  <Ionicons name="ios-images-outline" size={17 * PIXEL_RATE} style={{color: '#73C7EB', marginLeft: 19 * PIXEL_RATE}}/>
                  <Text style={{marginLeft: 15 * PIXEL_RATE, fontSize: 14 * PIXEL_RATE}}>
                      我的游记
                  </Text>
                  <Ionicons name="ios-arrow-forward" size={23 * PIXEL_RATE} style={{color: '#A1A1A1', position: 'absolute', marginLeft: 338 * PIXEL_RATE}}/>
              </View>
              <View style={styles.items}>
                  <Ionicons name="ios-text-outline" size={20 * PIXEL_RATE} style={{color: '#73C7EB', marginLeft: 19 * PIXEL_RATE}}/>
                  <Text style={{marginLeft: 15 * PIXEL_RATE, fontSize: 14 * PIXEL_RATE}}>
                      我的点评
                  </Text>
                  <Ionicons name="ios-arrow-forward" size={23 * PIXEL_RATE} style={{color: '#A1A1A1', position: 'absolute', marginLeft: 338 * PIXEL_RATE}}/>
              </View>
          </View>
          <View style={styles.configuration}>
              <Ionicons name="ios-settings-outline" size={20 * PIXEL_RATE} style={{color: '#73C7EB', marginLeft: 19 * PIXEL_RATE}}/>
              <Text style={{marginLeft: 15 * PIXEL_RATE, fontSize: 14 * PIXEL_RATE}}>
                      设置
              </Text>
              <Ionicons name="ios-arrow-forward" size={23 * PIXEL_RATE} style={{color: '#A1A1A1', position: 'absolute', marginLeft: 338 * PIXEL_RATE}}/>
          </View>
       </View>
     );
   }
}

export default Mine;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
  },
  frontCover: {
      width: 375 * PIXEL_RATE,
      height: 320 * PIXEL_RATE
  },
  head: {
      width: 100 * PIXEL_RATE,
      height: 100 * PIXEL_RATE,
      borderRadius: 50,
      marginTop: 80 * PIXEL_RATE,
      marginLeft: 139 * PIXEL_RATE
  },
  name: {
      marginTop: 10 * PIXEL_RATE,
      marginLeft: 153 * PIXEL_RATE,
      width: 78 * PIXEL_RATE,
      height: 23 * PIXEL_RATE,
      paddingTop: 4,
      color: '#FFF',
      textAlign: 'center',
      fontSize: 14 * PIXEL_RATE
  },
  star: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 155 * PIXEL_RATE,
      marginRight: 146 * PIXEL_RATE
  },
  info: {
      flexDirection: 'row',
      justifyContent: 'center',
      height: 44 * PIXEL_RATE,
      width: 283 * PIXEL_RATE,
      marginLeft: 48  * PIXEL_RATE,
      marginTop: 28 * PIXEL_RATE
  },
  infodetail: {
      justifyContent: 'space-around'
  },
  infotext: {
      color: '#FFF',
      textAlign: 'center',
      fontSize: 14 * PIXEL_RATE
  },
  mycollection: {
      flexDirection: 'row',
      marginTop: 14 * PIXEL_RATE,
      height: 45 * PIXEL_RATE,
      alignItems: 'center',
      backgroundColor: '#FFF'
  },
  myitems: {
      marginTop: 13 * PIXEL_RATE,
      height: 136 * PIXEL_RATE,
      justifyContent: 'space-between',
  },
  items: {
    flexDirection: 'row',
    height: 45 * PIXEL_RATE,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  configuration: {
      marginTop: 13 * PIXEL_RATE,
      height: 45 * PIXEL_RATE,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF'
  }
});

