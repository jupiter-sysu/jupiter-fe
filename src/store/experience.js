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
    @observable totalPage = 1;

    @observable modalVisible = false;
    @observable searchValue = '';
    @observable searchHistory=[];
    @observable currentTab = 1;
    @observable currentSearchResult = {
        country: [],
        city: [],
        experience: [],
    };

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
    clearSearchData() {
        this.currentSearchResult = {
            country: [],
            city: [],
            experience: [],
        };
    }

    @action.bound
    async changeSearchValue(value) {
        this.searchValue = value;
        if (value) {
            try {
                const { data } = await sPost('/search/', {
                    type: 1,
                    search: value,
                });
                const result = await sPost('/search/', {
                    type: 2,
                    search: value,
                });
                this.currentSearchResult.experience = result.data.experience;
                this.currentSearchResult.country = data.country;
                this.currentSearchResult.city = data.city;
                console.log(this.currentSearchResult, 'result');
            } catch (err) {
                Toast.info(err.message, 2);
            }
        } else {
            this.currentSearchResult.country = [];
            this.currentSearchResult.city = [];
            this.currentSearchResult.experience = [];

        }
        
    }

    @action.bound
    clearHistory() {
        this.searchHistory = [];
    }

    @action.bound
    handleSearch() {
        this.searchHistory=this.searchHistory.concat({name: this.searchValue, type: 'search'});
    }

    @action.bound
    setModalVisible(status) {
        this.modalVisible = status;
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
        if (this.currentPage <= this.totalPage) {
            if (this.currentPage === 1) {
                this.isIniting = true;
            }
            try {
                const { data } = await sPost('/experience/homepage/', {
                    page: this.currentPage
                });
                if (this.currentPage === 1) {
                    this.headerPhoto = 'http://p9alq612u.bkt.clouddn.com/20180524172337774.png';
                    this.totalPage = data.page_sum;
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
            } catch (err) {
                Toast.info(err.message, 2);
            } finally {
                this.isIniting = false;
            }
        }
    }

    @action.bound
    async loadComment() {
        this.isCommentIniting = true;
        try{
            const { data } = await sPost('/experience/review/', {
                experience_id: this.currentExperienceID,
                page_num: 1,
            });
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
            const { data } = await sPost('/experience/review/detail/', {
                review_id: this.commentID,
                page_num:  1
            });
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
        console.log(this.currentData.city.slice(), '?')
        this.currentData.city.slice().forEach((city, index) => {
            const { city_name, items, ...others } = city;
            result.push({
                title: city_name,
                data: [items],
                ...others
            });
        });
        return result;
    }

    // 玩法页数据
    @observable introductionFold = true;
    @observable detailPageIniting = true;
    @observable scrollY = 0;
    @observable like = false;
    @observable detail = null;

    @action.bound
    async loadExperiencePage() {
        this.detailPageIniting = true;
        try {
            const {data} = await sPost('/experience/detail/', {
                experience_id: this.currentExperienceID
            });
            this.detail = data;
            console.log(data, 'test');
        } catch (err) {
            Toast.info(err.message, 2);
        } finally {
            this.detailPageIniting = false;
        }
    }

    @action.bound
    setScrollY(Y) {
        this.scrollY = Y;
    }

    @computed
    get searchResultArray() {
        let result = [];
        this.currentSearchResult.experience.forEach((item) => {
            result.push({ data: item, type: '体验'});
        });
        this.currentSearchResult.country.forEach((item) => {
            result.push({ data: item, type: '国家' });
        });
        this.currentSearchResult.city.forEach((item) => {
            result.push({ data: item, type: '城市' });
        });
        // console.log(result, result.length, this.searchHistory);
        // if (result.length === 0) {
        //     console.log(this.searchHistory.slice(), 'enter');
        //     return this.searchHistory.slice();
        // }
        return result;
    }



}

const store = window.store.experience = new experienceSotre();

export default store;