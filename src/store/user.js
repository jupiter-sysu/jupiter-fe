import { action, autorun, observable } from 'mobx';
import { Toast } from 'antd-mobile';
import { persist } from 'mobx-persist';
import myFetch from '../utils/fetch';


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
            return 500;
        } else {
            const postData = {
                phone_num: Number(phone),
                password: pass,
            }
            console.log(postData);
           this.setModalVisible(true);

            // 请求数据2
            let data = await myFetch('mobile_message', 'POST', postData);
            console.log(data);

            this.setModalVisible(false);

            // 如果已经注册了
            if (data.error_code === 401) {
                // 提示手机已经注册,使用setTimeout是为了modal关闭后马上执行alert，否则会有冲突
                return 401;
            } else if (data.error_code === 200) {
                this.setUserPhone(Number(phone));
                this.setUserPassword(pass);
                return 200;

            }
        }
    }

    @action.bound
    async validateConfirmCode() {
        if (this.networkType === 'none' || this.networkType === 'NONE') {  
            // Toast.offline('\n暂无网络，请检查您的网络设置', 2);
            return 0;
        } else {
            const postData = {
                phone_num: this.userphone,
                mobile_message: this.confirmCode,
            }

            this.setModalVisible(true);

            // 请求数据2
            let data = await myFetch('registration_page', 'POST', postData);

            this.setModalVisible(false);

            console.log(data);

            // 如果已经注册了
            if (data.error_code === 401) {
                // 提示手机已经注册,使用setTimeout是为了modal关闭后马上执行alert，否则会有冲突
                return 401
            } else if (data.error_code === 200) {
                this.isLogin = true;
                return 200;
            }
        }
    }

    // Login state，直接登录
    @action.bound
    async loginWithPhone(phone = this.user.userphone, pass = this.user.userPassword) {
        if (this.networkType === 'none' || this.networkType === 'NONE') {
            return 0;
        } else {
            const postData = {
                phone_num: Number(phone),
                password: pass,
            }
            console.log(postData);
            this.setModalVisible(true);

            // 发送请求
            let data = await myFetch('mobile_login', 'POST', postData);
            console.log(data);

            this.setModalVisible(false);

            if (data.error_code === 200) {
                this.setUserPhone(Number(phone));
                this.setUserPassword(pass);
                this.isLogin = true;
                return 200;
            } else {
                return data.error_code;
            }
        }
    }

    // 找回密码时，请求验证码
    @action.bound
    async getFindPasswordConfirmCode(phone = this.user.userphone) {
        if (this.networkType === 'none' || this.networkType === 'NONE') {
            return 0;
        } else {
            const postData = {
                phone_num: Number(phone),
            }
            console.log(postData);
            this.setModalVisible(true);

            // 请求数据2
            let data = await myFetch('password_change', 'POST', postData);
            console.log(data);

            this.setModalVisible(false);

            if (data.error_code === 401) {
                return 401;
            } else if (data.error_code === 200) {
                this.setUserPhone(Number(phone));
                return 200;
            }
        }
    }

    // 找回密码时，提交验证码给服务器，判断验证码是否有效
    @action.bound
    async validateFindPasswordIDCode() {
        if (this.networkType === 'none' || this.networkType === 'NONE') {
            return 0;
        } else {
            const postData = {
                mobile_message: this.confirmCode,
            }

            this.setModalVisible(true);

            // 请求数据2
            let data = await myFetch('verify_message', 'POST', postData);

            this.setModalVisible(false);

            console.log(data);

            if (data.error_code === 401) {
                return 401;
            } else if (data.error_code === 200) {
                console.log('200');
                return 200;

            }
        }
    }

    // 找回密码时，提交新密码，更改密码
    @action.bound
    async setNewPassword(pass = this.user.userPassword) {
        if (this.networkType === 'none' || this.networkType === 'NONE') {
            return 0;
        } else {
            const postData = {
                password: pass
            }
            console.log(postData);
            this.setModalVisible(true);

            // 请求数据2
            let data = await myFetch('new_password', 'POST', postData);
            console.log(data);

            this.setModalVisible(false);

            if (data.error_code === 401) {
                return 401;
            } else if (data.error_code === 200) {
                this.setUserPassword(pass);
                return 200;
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

}

const store = window.store = new user();

export default store;

