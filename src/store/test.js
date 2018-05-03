import { action, autorun, observable } from 'mobx';


class testStore {
    @observable date = new Date();
    @observable name = 'michael';
    @action.bound
    changeName(name) {
        this.name = name;
    }

}

const store = window.store = new testStore();

export default store;

autorun(() => {
    console.log(store.date);
});
