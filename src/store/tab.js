import { action, autorun, observable, computed } from 'mobx';
import { Toast } from 'antd-mobile';
import sPost from '../utils/simpleFetch';

class tabSotre {
    @observable statusBarStyle = 'light-content';
    @action.bound
    setStatusBar(style) {
        this.statusBarStyle = style;
    }
}

const store = window.store.experience = new tabSotre();

export default store;