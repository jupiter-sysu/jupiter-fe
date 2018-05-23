import { action, autorun, observable } from 'mobx';
import { Toast } from 'antd-mobile';
import { persist } from 'mobx-persist';
import sPost from '../utils/simpleFetch';


class user {
    // signup state
    @observable networkType = true;
    @observable modalVisible = false;
    @action.bound
    setNetworkType(type) {
        this.networkType = type;
    }
    @action.bound
    setModalVisible(status) {
        this.modalVisible = status;
    }

    @action.bound
    logout() {
        this.isLogin = false;
        this.userphone = 0;
    }

    // confirmation state
    @observable confirmCode = '';
    @observable countdown = 90;
    @action.bound
    changeConfirmCode(text) {
        if (text.length < 5) {
            this.confirmCode = text;
        } 
    }
    @action.bound
    startCountdown() {
        this.countdown = 90;
        const timer = setInterval(() => {
            if (this.countdown >= 1) {
                this.countdown = this.countdown - 1; 
            } else {
                clearInterval(timer);
            }
        }, 1000)
    }

    @action.bound
    async getConfirmCode(phone = this.userphone, pass = this.userPassword) {
        if (this.networkType === 'none' || this.networkType === 'NONE') {
            Toast.info('暂无网络，请检查您的网络设置', 2);
            // Toast.offline('\n暂无网络，请检查您的网络设置', 2);
            return 0;
        } else {
            const postData = {
                phone_num: Number(phone),
                password: pass,
            }
            console.log(postData);
           this.setModalVisible(true);

           try {
               await sPost('/signup/get/captcha/', postData);
           } catch (err) {
              Toast.info(err.message, 2);
           } finally {
               this.setModalVisible(false);
           }
        }
    }

    // 找回密码时，请求验证码
    @action.bound
    async getFindPasswordConfirmCode(phone = this.user.userphone) {
        if (this.networkType === 'none' || this.networkType === 'NONE') {
            Toast.info('暂无网络，请检查您的网络设置', 2);
        } else {
            const postData = {
                phone_num: Number(phone),
            }
            console.log(postData);
            this.setModalVisible(true);
            try {
              await sPost('/modify/get/captcha/', postData);
            } catch(err) {
                if (err.message === 'unregistered') {
                    Toast.info('手机号码未注册', 2);
                }
            } finally {
                this.setModalVisible(false);
            }
        }
    }

    @persist @observable userphone = 0;
    @observable userPassword = '';
    @persist @observable isLogin = false;
    @action.bound
    setUserPhone(phone) {
        this.userphone = phone;
    }
    @action.bound
    setUserPassword(pass) {
        this.userPassword = pass;
    }

    @action.bound
    login() {
        this.isLogin = true;
    }

}

const store = window.store = new user();

export default store;

