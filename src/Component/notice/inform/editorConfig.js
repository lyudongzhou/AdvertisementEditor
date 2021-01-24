export default [
  {
    name: "通知",
    position: "3.3.0",
    after: {
      title: "通知配置",
      tab: {
        type: "timeTab",
        name: "通知配置",
        notSupport: "显示格式",
        support: "文本",
        target: "props.text",
        children: [],
      },
    },
    defaultSchema: {
      type: "informCmp",
      layoutConfig: {
        width: 100,
        height: 50,
      },
      props: {
        width: 100,
        height: 50,
        text: "通知",
        color: "#0f0",
        background: "#abcdef",
        "font-size": 30,
      },
      animation: [],
      events: [],
      children: [],
    },
  },
];
