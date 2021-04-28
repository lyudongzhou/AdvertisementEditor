/*
 * @Author: LyuDongzhou
 * @Date: 2020-11-30 23:28:17
 * @LastEditTime: 2020-12-02 23:33:50
 * @Description: file content
 */

export default [
  {
    name: "图片",
    position: "1",
    before: {
      types: ["image"],
      multi: true,
      title: "图片",
      fmtRes(a, schema) {
        if (!a || a.length === 0) {
          return schema;
        }
        let arr = [];
        let arr1 = [];
        let arrResources = [];
        a.forEach((ele) => {
          arr.push(ele.sourcePaht);
          arr1.push(ele.resName);
          arrResources.push({
            name:ele.resName,
            uuid:ele.uuid,
            url:ele.sourcePaht,
            payload:ele
          });
        });
        schema.props.bgUrl = arr;
        schema.props.introduce = arr1;
        schema.props.arrResources = arrResources;
        return new Promise((resolve)=>{
          var image = new Image();
          image.src = schema.props.bgUrl[0];
          image.onload = function(){
            schema.layoutConfig.width = image.width;
            schema.layoutConfig.height = image.height;
            resolve(schema);
          }
          
        });
      },
    },
    defaultSchema: {
      layoutConfig: {
        width: 200,
        height: 200,
      },
      props: {
        bgUrl: [],
        changeType: "",
        autoChange: true,
        changeTime: 5,
      },
      animation: [],
      events: [],
      type: "ImageCmp",
      children: [],
    },
  },
];
