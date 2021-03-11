export default [
  {
    name: "网页",
    position: "3.0.3",
    after: {
      title: "编辑网页",
      tab: {
        type: "basicTab",
        name: "网页配置",
        children: [
          {
            type: "textField",
            target: "props.text",
            label: "网页地址",
            props: {},
          },
          {
            type: "textField",
            target: "props.refreshTime",
            label: "刷新时间（秒）",
            props: {},
          },
          {
            type: "label",
            label: "确保接入网站没有设置X-Frame-Options",
          },
          {
            type: "label",
            label: " 动态参数的写法是xxx={{XXX}},比如https://www.h5-yes.com?deviceId={{deviceId}},系统支持的动态参数请查阅《****》",
          },
        ],
      },
    },
    defaultSchema: {
      type: "websiteCmp",
      layoutConfig: {
        width: 200,
        height: 200,
      },
      props: {
        text: "https://",
        refreshTime: "",
      },
      animation: [],
      events: [],
      children: [],
    },
  },
];
