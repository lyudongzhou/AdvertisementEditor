const state = {
    pageCount: 0,//页面总数
    currentPage: 0,//当前页面index
    designMode: false
};
const mutations = {
    pageCountChange(store, count) {
        store.pageCount = count;
        if (store.currentPage >= count) {
            store.currentPage = count - 1;
        }
    },
    nextPage(store) {
        if (store.currentPage < store.pageCount - 1) {
            store.currentPage += 1;
        }
    },
    prePage(store) {
        if (store.currentPage > 0) {
            store.currentPage -= 1;
        }
    },
    jumpPage(store, pageID) {
        if (pageID < store.pageCount) {
            store.currentPage = pageID;
        }
    },
    setDesignMode(store,bool){
        store.designMode = bool;
    }
};
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
