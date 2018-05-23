import { action, autorun, observable, computed } from 'mobx';
import { Toast } from 'antd-mobile';
import sPost from '../utils/simpleFetch';

class experienceSotre {
    @observable isIniting = false;
    @observable statusBarStyle = 'light-content';
    @observable currentIndex = 4;
    @observable currentHeaderPic = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526906591684&di=20187c08b99ba7ec45a7feb2f2223c7e&imgtype=0&src=http%3A%2F%2Fy3.ifengimg.com%2Fd4a44fff10624b98%2F2014%2F0226%2Frdn_530d29c87d35f.jpg';
    @observable currentDiscovery = null;
    @observable headerPhoto = '';
    @observable showHeaderSearchBar = false;
    @observable currentData = null;

    @action.bound
    setHeaderSearchBar(status) {
        this.showHeaderSearchBar = status;
    }

    @action.bound
    async loadPage() {
        this.isIniting = true;
        try {
            const { data } = await sPost('https://dsn.apizza.net/mock/d219e15359947f0ce7411b7b91fd5668/experience/homepage', { 
                item_count: this.currentIndex 
            });
            const url = data.experience_photo;
            this.currentHeaderPic = url;
            // console.log(data.discovery);
            this.currentDiscovery = data.discovery;
            this.headerPhoto = data.experience_photo;
            this.currentData = data;
            console.log(data);
        } catch(err) {
            Toast.info(err.message, 2);
        } finally {
            this.isIniting = false;
        }
    }

    @action.bound
    setStatusBar(style) {
        this.statusBarStyle = style;
    }

    @computed
    get section() {
        let result = [];
        if (this.currentData === null) {
            return result;
        }
        const { items, ...others } = this.currentData.discovery;
        result.push({
            data: [items],
            ...others
        });
        this.currentData.city.map((city, index) => {
            const { name, items, ...others } = city;
            result.push({
                title: name,
                data: [items],
                ...others
            });
        });
        return result;
    }



}

const store = window.store.experience = new experienceSotre();

export default store;