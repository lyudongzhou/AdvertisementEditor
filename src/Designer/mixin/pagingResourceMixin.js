var console = { log: () => {} };
export default {
  props: {
    sortConfig: {
      type: Object,
      default() {
        return {
          resType: 0,
          userId: 0,
          current: 1,
          size: 20,
          orderType: 0,
          priceType: 1,
          type: 1,
        };
      },
    },
  },

  data() {
    return {
      isLoading: false,
      loadID: 0,
      loadCount: 20,
      currentPage: 0,
      url: "/res/get",
      aResource: [],
      total: undefined,
    };
  },
  computed: {
    cannotLoad() {
      if (this.total === undefined) {
        return this.isLoading;
      } else {
        return this.isLoading || this.total < this.loadCount * this.currentPage;
      }
    },
    noMore() {
      return this.total < this.loadCount * this.currentPage;
    },
  },
  methods: {
    reset() {
      console.log("reset");
      this.loadID++;
      this.aResource.splice(0, this.aResource.length);
      let o = {
        isLoading: false,
        loadID: 0,
        loadCount: 20,
        currentPage: 0,
        total: undefined,
      };
      Object.assign(this, o);
    },
    loadResource() {
      console.log("loadRes");
      if (this.isLoading) {
        return false;
      }
      this.isLoading = true;
      this.currentPage++;
      this.getResources().then((res) => {
        this.onLoad(res);
        this.isLoading = false;
      });
    },
    fmtRes(res) {
      return res;
    },
    onLoad(res) {
      console.log(res);
      res.data.resources.forEach((ele) => {
        this.aResource.push(this.fmtRes(ele));
      });
      this.isLoading = false;
      this.total = res.data.total;
      console.log(this.aResource);
    },
    getResources() {
      return new Promise((resolve) => {
        let loadID = this.loadID;
        this.$axios
          .get(this.url, this.fmtParams(this.calculatePara()))
          .then((res) => {
            if (loadID === this.loadID) {
              resolve(res, loadID);
            }
          });
      });
    },
    fmtParams({
      resType = 0,
      userId = 0,
      current = 1,
      size = 20,
      orderType = 0,
      priceType = 1,
      type = 1,
    }) {
      return { resType, userId, current, size, orderType, priceType, type };
    },
    calculatePara() {
      let para = {};
      Object.assign(para, this.sortConfig || {}, {
        current: this.currentPage,
        size: this.loadCount,
      });
      console.log(para);
      return para;
    },
  },
};