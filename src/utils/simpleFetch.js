import { Platform } from 'react-native';
import { Toast } from 'antd-mobile';
import { SERVER } from '../app-config/nework';
import { APP_NAME, APP_VERSION } from '../app-config/basic';

/**
 * 基本 POST 请求
 * @param {String} url - 以 '/' 开头; 或者完整带 http/https 的路径
 * @param {Object} data - 包体
 */

function myFetch(url, data) {
  const fullUrl = url.indexOf('http') === -1 ? (SERVER + url) : url;
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    const postPromise = Promise.race([
      fetch(fullUrl, {
        method: 'POST',
        headers: {
          ...header,
          'Content-Type': 'application/json',
          'User-Agent': Platform.OS === 'android' ? `${APP_NAME}Android/${APP_VERSION}` : `${APP_NAME}IOS/${APP_VERSION}`,
        },
        body,
      }),
      new Promise(((resolve, reject) => {
        setTimeout(() => reject(new Error('timeout')), 10000);
      })),
    ]);

    postPromise.then((res) => {
      if (res && res.status == 200) {
        return res.json();
      }
      throw new Error('server error');
    }).then((res) => {
      if (res.code == 200 && res.enmsg === 'ok') {
        resolve(res);
      } else if (res.code === 401) {
        // log out
      } else {
        Toast.info(res.cnmsg, 2);
        reject(new Error('error'));
      }
    }).catch((err) => {
      if (err.message === 'server error') {
        Toast.info('服务器内部错误', 2);
        reject(new Error('error'));
      } else if (err.message === 'timeout') {
        Toast.info('请求超时，请检查您的网络设置', 2);
        reject(new Error('error'));
      } else {
        Toast.info('客户端错误', 2);
        console.log(err);
        reject(new Error('error'));
      }
    });
  });
}


function simpleFetch(url, data) {
  const fullUrl = url.indexOf('http') === -1 ? (SERVER + url) : url;
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fetch(fullUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })
      .then((res) => {
        if (res && res.status == 200) {
          return res.json();
        }
        throw new Error('server error');
      })
      .then((res) => {
        console.log(res);
        if (res.code == 200 && res.enmsg === 'ok') {
          resolve(res);
        } else if (res.code === 401) {
          // log out
          reject(new Error('authorization'));
        } else {
          console.log('err');
          reject(new Error(res.enmsg));
        }
      })
      .catch((err) => {
        console.log(err);
        reject(new Error('server error'));
      });
  });
}

export default simpleFetch;
