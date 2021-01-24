export default [
  {
    name: "混播",
    position: "3.0.0",
    before: {
      types: ["image","video","document"],
      multi: true,
      title: "混播",
      fmtRes(a, schema) {
        if (!a || a.length === 0) {
          return schema;
        }
        let arr = [];
        a.forEach((ele) => {
          let t = [];
          if (ele.resType === 4) {
            ele.imgList.forEach((ele) => {
              t.push({ sourcePaht: ele, resType: 1 });
            });
            arr.push.apply(arr, t);
          }else{
            arr.push(ele);
          }
        });
        schema.props.components = arr;
        return schema;
      },
    },
    defaultSchema: {
      "type": "mixplayCmp",
      "layoutConfig": {
        "width": 200,
        "height": 200
      },
      "props": {
        "components":[],
        "changeTime":3
      },
      "animation": [],
      "events": [],
      "children": []
    }
  }
]
