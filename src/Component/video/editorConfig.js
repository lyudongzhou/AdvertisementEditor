/*
 * @Author: LyuDongzhou
 * @Date: 2020-11-30 23:28:17
 * @LastEditTime: 2020-12-02 23:33:50
 * @Description: file content
 */

export default [
  {
    name: "视频",
    position: "2",
    before: {
      types: ["video"],
      multi: true,
      title: "视频",
      fmtRes(a, schema) {
        if (!a || a.length === 0) {
          return schema;
        }
        let arr = [];
        let arr1 = [];
        a.forEach(ele=>{
          arr.push(ele.sourcePaht);
          arr1.push({
            name:ele.resName,
            uuid:ele.uuid,
            url:ele.sourcePaht,
            payload:ele
          });
        });
        schema.props.bgUrl = arr;
        schema.props.arrResources = arr1;
        return schema;
      },
    },
    defaultSchema: {
      type: "VideoCmp",
      layoutConfig: {
        width: 300,
        height: 300,
      },
      props: {
        videoSrc: "",
      },
      animation: [],
      events: [],
      children: [],
    },
  },
];
