import actions from './actions';

const state = {
    pageCount: 0,//页面总数
    currentPage: 0,//当前页面index
    targetPage: 0,
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
    nextPage(store) {
        if (store.targetPage < store.pageCount - 1) {
            if (store.currentPage === store.targetPage) {
                store.targetPage += 1;
            }
        }
    },
    prePage(store) {
        if (store.targetPage > 0) {
            if (store.currentPage === store.targetPage) {
                store.targetPage -= 1;
            }
        }
    },
    jumpPage(store, pageID) {
        if (pageID < store.pageCount) {
            if (store.currentPage === store.targetPage) {
                store.targetPage = pageID;
            }
        }
    },
    jumpPageReal(store, pageID) {
        if (pageID < store.pageCount) {
            store.currentPage = pageID;
        }
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
