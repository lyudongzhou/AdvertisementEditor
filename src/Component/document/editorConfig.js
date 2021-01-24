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
        let arr = [];
        a.forEach((ele) => {
          arr.push.apply(arr, ele.imgList);
        });
        schema.props.bgUrl = arr;
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
