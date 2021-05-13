export default [
  {
    name: "混播",
    position: "3.0.0",
    before: {
      types: ["image", "video", "document"],
      multi: true,
      title: "混播",
      fmtRes(a, schema) {
        if (!a || a.length === 0) {
          return schema;
        }
        let arr = [];
        let arrResources = [];
        a.forEach((ele) => {
          let t = [];
          if (ele.resType === 4) {
            ele.imgList.forEach((ele) => {
              t.push({ sourcePaht: ele.url, resType: 1 });
              arrResources.push({
                name: ele.resName,
                uuid: ele.uuid,
                url: ele.url,
              });
            });
            arr.push.apply(arr, t);
          } else {
            arr.push(ele);
            arrResources.push({
              name: ele.resName,
              uuid: ele.uuid,
              url: ele.sourcePaht,
            });
          }
        });
        schema.props.components = arr;
        schema.props.arrResources = arrResources;
        return schema;
      },
    },
    defaultSchema: {
      type: "mixplayCmp",
      layoutConfig: {
        width: 200,
        height: 200,
      },
      props: {
        components: [],
        changeTime: 3,
      },
      animation: [],
      events: [],
      children: [],
    },
  },
];
