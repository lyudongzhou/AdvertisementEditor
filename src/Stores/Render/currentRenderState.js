/*
 * @Author: LyuDongzhou
 * @Date: 2020-11-30 04:01:05
 * @LastEditTime: 2020-12-07 04:03:05
 * @Description: file content
 */
import actions from './actions';

const state = {
  schema: null,
  pageCount: 0,
  currentPage: "1",//当前页面ID
  targetPage: "1",//目标页面ID
  designMode: false,
  baseUrl: '',
  windowStorage: [], // 页面路径存储，弹窗返回使用
  singlePagePreview: false,
};
const mutations = {
  setSchema(store, schema) {
    store.schema = schema;
  },
  setSinglePagePreview(store, prop) {
    store.singlePagePreview = prop;
  },
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
    if (!store.singlePagePreview) {
      store.targetPage = ID;
    }
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
  jumpPageImmediately(store, pageID) {
    store.currentPage = pageID;
    store.targetPage = pageID;
  },
  setDesignMode(store, bool) {
    store.designMode = bool;
  },
  setBaseUrl(store, baseUrl) {
    store.baseUrl = baseUrl;
  },

  addWindowData(state, { toId, backTime, type }) {
    if (type === 'pages') {
      console.log('clear windowStorage');
      state.windowStorage.length = 0;
    }
    state.windowStorage.push({
      fromId: state.currentPage,
      toId,
      backTime,
    });
  },
  backPrevDialog(state) {
    state.windowStorage.pop();
  }


};
const getters = {
  currentPage: state => state.currentPage,
  handleUrl: state => url => `${state.baseUrl}${url}`,
  targetPage: state => state.targetPage,
  designMode: state => state.designMode,
  nextID(state) {
    let findIndex = -1;
    state.schema.pages.some((ele, index) => {
      if (ele.id === state.currentPage) {
        findIndex = index;
        return true;
      }
    });
    if(findIndex!==-1){
      if(findIndex===state.schema.pages.length-1){
        return {type:"null",id:null};
      }
      return {type:"page",id:state.schema.pages[findIndex+1].id};
    }
    state.schema.dialogs.some((ele, index) => {
      if (ele.id === state.currentPage) {
        findIndex = index;
        return true;
      }
    });
    if(findIndex!==-1){
      if(findIndex===state.schema.dialogs.length-1){
        return {type:"null",id:null};
      }
      return {type:"dialog",id:state.schema.dialogs[findIndex+1].id};
    }
    return {type:"null",id:null};
  },
  preID(state) {
    let findIndex = -1;
    state.schema.pages.some((ele, index) => {
      if (ele.id === state.currentPage) {
        findIndex = index;
        return true;
      }
    });
    if(findIndex!==-1){
      if(findIndex===0){
        return {type:"null",id:null};
      }
      return {type:"page",id:state.schema.pages[findIndex-1].id};
    }
    state.schema.dialogs.some((ele, index) => {
      if (ele.id === state.currentPage) {
        findIndex = index;
        return true;
      }
    });
    if(findIndex!==-1){
      if(findIndex===0){
        return {type:"null",id:null};
      }
      return {type:"dialog",id:state.schema.dialogs[findIndex-1].id};
    }
    return {type:"null",id:null};
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
