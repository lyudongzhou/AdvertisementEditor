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
        width: 200,
        height: 100,
      },
      props: {
        width: 200,
        height: 100,
        text: "通知",
        color: "#000",
        background: "transparent",
        "font-size": 30,
      },
      animation: [],
      events: [],
      children: [],
    },
  },
];
