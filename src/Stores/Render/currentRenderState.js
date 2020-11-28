import actions from './actions';

const state = {
    pageCount: 0,
    currentPage: 0,//当前页面index
    targetPage: 0,//目标页面index
    designMode: false,
    baseUrl: '',
};
const mutations = {
    pageCountChange(store, count) {
        store.pageCount = count;
        if (store.targetPage >= count) {
            store.targetPage = count - 1;
        }
    },

    /**
     * @description Jump to next page. It is not a sync function. 
     * @author lyuDongzhou
     * @date 2020-11-28
     * @param {*} store
     */
    nextPage(store) {
        if (store.targetPage < store.pageCount - 1) {
            if (store.currentPage === store.targetPage) {
                store.targetPage += 1;
            }
        }
    },

    /**
     * @description Jump to pre page. It is not a sync function
     * @author lyuDongzhou
     * @date 2020-11-28
     * @param {*} store
     */
    prePage(store) {
        if (store.targetPage > 0) {
            if (store.currentPage === store.targetPage) {
                store.targetPage -= 1;
            }
        }
    },

    /**
     * @description Jump to specific page. It is not a sync function
     * @author lyuDongzhou
     * @date 2020-11-28
     * @param {*} store
     * @param {*} pageID
     */
    jumpPage(store, pageID) {
        if (pageID < store.pageCount) {
            if (store.currentPage === store.targetPage) {
                store.targetPage = pageID;
            }
        }
    },

    /**
     * @description Jump to specific page. It is sync function
     * @author lyuDongzhou
     * @date 2020-11-28
     * @param {*} store
     * @param {*} pageID
     */
    jumpPageReal(store, pageID) {
        if (pageID < store.pageCount) {
            store.currentPage = pageID;
        }
    },

    /**
     * @description This function should change currentPage first to avoid jump page action.
     * @author lyuDongzhou
     * @date 2020-11-28
     * @param {*} store
     * @param {*} pageID
     */
    jumpPageImmediately(store,pageID){
        store.currentPage = pageID;
        store.targetPage = pageID;
    },
    setDesignMode(store, bool) {
        store.designMode = bool;
    },
    setBaseUrl(store, baseUrl) {
        store.baseUrl = baseUrl;
    }
};
const getters = {
    currentPage(state) {
        return state.currentPage;
    },
    handleUrl: state => url => `${state.baseUrl}${url}`,
    targetPage:state=>state.targetPage,
    designMode:state=>state.designMode
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
