import { action, autorun, observable } from 'mobx';
import { Toast } from 'antd-mobile';
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
        this.countdown = 10;
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
        } else {
            const postData = {
                phone_num: Number(phone),
                password: pass,
            }
            console.log(postData);
           this.setModalVisible(true);

            // 请求数据2
            let data = await myFetch('mobile_message.php', 'POST', postData);
            console.log(data);

            this.setModalVisible(false);

            // 如果已经注册了
            if (data.error_code === 401) {
                // 提示手机已经注册,使用setTimeout是为了modal关闭后马上执行alert，否则会有冲突
                return false;
            } else if (data.error_code === 200) {
                this.setUserPhone(Number(phone));
                this.setUserPassword(pass);
                return true;

            }
            return false;
        }
    }

    @action.bound
    async validateConfirmCode() {
        if (this.networkType === 'none' || this.networkType === 'NONE') {
            Toast.info('暂无网络，请检查您的网络设置', 2);
            // Toast.offline('\n暂无网络，请检查您的网络设置', 2);
        } else {
            const postData = {
                phone_num: this.userphone,
                mobile_message: this.confirmCode,
            }

            this.setModalVisible(true);

            // 请求数据2
            let data = await myFetch('registration_page.php', 'POST', postData);

            this.setModalVisible(false);

            console.log(data);

            // 如果已经注册了
            if (data.error_code === 401) {
                console.log('401')
                // 提示手机已经注册,使用setTimeout是为了modal关闭后马上执行alert，否则会有冲突
                setTimeout(() => {
                    return false;
                }, 0);
            } else if (data.error_code === 200) {
                console.log('200')
                this.isLogin = true;
                return true;

            }
            return false;
        }
    }

    @observable userphone = 13902280045;
    @observable userPassword = '';
    @observable isLogin = false;
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

