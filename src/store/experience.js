import { action, autorun, observable, computed } from 'mobx';
import { Toast } from 'antd-mobile';
import sPost from '../utils/simpleFetch';

class experienceSotre {
    @observable isIniting = false;
    @observable statusBarStyle = 'light-content';
    @observable currentPage = 1;
    @observable currentHeaderPic = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526906591684&di=20187c08b99ba7ec45a7feb2f2223c7e&imgtype=0&src=http%3A%2F%2Fy3.ifengimg.com%2Fd4a44fff10624b98%2F2014%2F0226%2Frdn_530d29c87d35f.jpg';
    @observable currentDiscovery = null;
    @observable headerPhoto = '';
    @observable showHeaderSearchBar = false;
    @observable currentData = null;
    @observable showOriginalSearchBar = true;
    @observable currentExperienceID = '';
    @observable currentTab = 1;
    @observable introductionFold = true;
    @observable detail = { "code": 200, "enmsg": "ok", "cnmsg": "成功", 
                            "data": {   "cover_img": "url", 
                                        "experience_title": "卡帕多奇亚·星球地貌", 
                                        "experience_brief_decription": "如果你想去月球，不妨先来这里看看",
                                         "experience_author": "一粒尘埃", 
                                         "author_profile_img": "url",
                                        "tags": ["土耳其", "奇异", "壮观", "浪漫"], 
                                        "recommend_reason": "在这幽美的山谷两边，到处的是大块的石头，倘若你仔细看在石头，会发现上面都是密密麻麻大小不一的鸽子洞，实际上这是一些特大号的圆锥形岩层。松软的岩石酷似锥形的尖塔，尖塔顶端被大自然赋予了一块更加松软的玄武岩“帽子”。", 
                                "experience_introduction": "卡帕多奇亚是世界至壮观的“风化区”，触目所及尽是被“吹残”后的天然石雕。卡帕多奇亚奇石林，此地奇特之天然奇景，举世闻名，其大约于三百 万年前，由于火山爆发，熔岩及火山灰覆盖该地，后经长期风化侵蚀，成为现在特殊地形。千姿百态的石头，各种稀奇古怪的 造型，使人感叹是否来到了外星球。美国的科幻大片《星球大战》曾在此取景。由于风景独特，联合国现已将该区列入“世界遗产”的名册内。", 
                                        "experience_introduction_imgs": ["url"], 
                                "stress_infomation": "最佳旅行时间：4-5月、9-10月•  穿衣指南：全年注意防晒，除了夏天，其他三季要注意早晚的保暖。•  货币：土耳其通用货币是里拉。常用的纸币面值有5、10、20、50、100和200里拉。门票：成人200里拉，儿童100里拉", 
                                        "nearby_experience": [{ "experience_id": "000000", "feature": "奇异", "card_img": "url", "experience_title": "卡帕多奇亚：星球地貌", "experience_brief_discription": "如果你想去月球，不妨先来这里看看" }, 
                                                                { "experience_id": "000001", "feature": "奇异", "card_img": "url", "experience_title": "卡帕多奇亚：星球地貌", "experience_brief_discription": "如果你想去月球，不妨先来这里看看" }, 
                                                                { "experience_id": "000002", "feature": "奇异", "card_img": "url", "experience_title": "卡帕多奇亚：星球地貌", "experience_brief_discription": "如果你想去月球，不妨先来这里看看" },
                                                                { "experience_id": "000003", "feature": "奇异", "card_img": "url", "experience_title": "卡帕多奇亚：星球地貌", "experience_brief_discription": "如果你想去月球，不妨先来这里看看" }] 
                            } 
    }

    @action.bound
    setCurrentTab(id) {
        this.currentTab = id;
    }

    @action.bound
    setCurrentExperienceID(id) {
        this.currentExperienceID = id;
    }

    @action.bound
    setHeaderSearchBar(status) {
        this.showHeaderSearchBar = status;
    }

    @action.bound
    setOriginalSearchBar(status) {
        console.log(status);
        this.showOriginalSearchBar = status;
    }

    @action.bound
    async loadPage() {
        if (this.currentPage === 1) {
            this.isIniting = true;
        }
        try {
            const { data } = await sPost('https://dsn.apizza.net/mock/d219e15359947f0ce7411b7b91fd5668/experience/homepage', { 
                page: this.currentPage 
            });
            if (this.currentPage === 1) {
                this.headerPhoto = data.experience_photo;
                this.currentData = data;
            } else {
                const city = data.city;
                let prevCity = this.currentData.city.slice();
                console.log(prevCity, city);
                let newCity = prevCity.concat(city);
                this.currentData.city = newCity;
            }
            this.currentPage = this.currentPage + 1;
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
        console.log(this.currentData.city, '?')
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