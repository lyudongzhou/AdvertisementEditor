export default {
  nextPage (context) {
    context.commit('nextPage');
  },
  prevPage (context) {
    context.commit('prePage');
  },
  jumpPage (context, pageID) {
    context.commit('jumpPage', pageID);
  }
};
