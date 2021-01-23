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
      multi: false,
      title: "视频",
      fmtRes(a, schema) {
        if (!a || a.length === 0) {
          return schema;
        }
        schema.props.bgUrl = a[0].sourcePaht;
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
