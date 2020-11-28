import actions from './actions';

const state = {
    pageCount: 0,
    currentPage: "1",//当前页面ID
    targetPage: "1",//目标页面ID
    designMode: false,
    baseUrl: '',
    pathStroage: [] // 页面路径存储，弹窗返回使用
};
const mutations = {
    pageCountChange(store, count) {
        store.pageCount = count;
        if (store.targetPage >= count) {
            store.targetPage = count - 1;
        }
    },

    /**
     * @description Jump to specific page. It is not a sync function
     * @author lyuDongzhou
     * @date 2020-11-28
     * @param {*} store
     * @param {*} ID(pageID||DialogID)
     */
    jumpPage(store, ID) {
      store.targetPage = ID;
    },

    /**
     * @description Jump to specific page. It is sync function
     * @author lyuDongzhou
     * @date 2020-11-28
     * @param {*} store
     * @param {*} pageID
     */
    jumpPageReal(store, ID) {
      store.currentPage = ID;
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
    },

    addPathData (state, uuid, type) {
      if (type === 'pages') {
        state.pathStroage.length = 0;
      }
      state.pathStroage.push(uuid);
    },
    backPrevPath (state) {
      state.pathStroage.pop();
    }


};
const getters = {
    currentPage: state => state.currentPage,
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
