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
    @observable currentTab = 2;

    @observable isLike = false;
    @observable commentID = 0;
    @observable isCommentIniting = false;
    @observable currentComment = null;
    @observable currentCommentReview = null;
    @observable isCommentReviewIniting = false;
    @observable currentComment_reviews = null;

    @action.bound
    toggleLikeStatus() {
        this.isLike = !this.isLike;
    }

    @action.bound
    setCommentID(id) {
        this.commentID = id;
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
    async loadComment() {
        this.isCommentIniting = true;
        try{
            const { data } = await sPost('https://dsn.apizza.net/mock/d219e15359947f0ce7411b7b91fd5668/experience/review');
            console.log(data);
            this.currentComment = data;
            this.currentComment_reviews = data.reviews;
        }catch(err){
            Toast.info(err.message, 2);
        }finally {
            this.isCommentIniting = false;
        }
        
    }

    @action.bound
    async loadCommentReview() {
        this.isCommentReviewIniting = true;
        try{
            const { data } = await sPost('https://dsn.apizza.net/mock/d219e15359947f0ce7411b7b91fd5668/experience/review/comment_detail');
            console.log(data);
            this.currentCommentReview = data;
        }catch(err){
            Toast.info(err.message, 2);
        }finally {
            this.isCommentReviewIniting = false;
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