import { action, autorun, observable } from 'mobx';


class user {
    @observable userphone = 0;
    @observable isLogin = false;
    @action.bound
    setUserPhone(phone) {
        this.userphone = phone;
    }

}

const store = window.store = new user();

export default store;

