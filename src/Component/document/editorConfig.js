export default [
  {
    name: "文档",
    position: "3.0.1",
    before: {
      types: ["document"],
      multi: true,
      title: "文档",
      fmtRes(a, schema) {
        if (!a || a.length === 0) {
          return schema;
        }
        let arrResources = [];
        let arr = [];
        a.forEach((ele) => {
          ele.imgList.forEach((ele) => {
            arr.push(ele.url);
            arrResources.push({
              name: ele.resName,
              uuid: ele.uuid,
              url: ele.url,
            });
          });
          // arr.push.apply(arr, ele.imgList);
        });
        schema.props.bgUrl = arr;
        schema.props.arrResources = arrResources;
        return schema;
      },
    },
    defaultSchema: {
      type: "documentCmp",
      layoutConfig: {
        width: 200,
        height: 200,
      },
      props: {
        bgUrl: [],
        changeType: "",
        autoChange: false,
        changeTime: 5,
      },
      animation: [],
      events: [],
      children: [],
    },
  },
];
