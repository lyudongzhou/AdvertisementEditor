export default [
  {
    name: "字幕",
    position: "3.3.1",
    after: {
      title: "字幕配置",
      tab: {
        type: "captionTab",
        name: "字幕配置",
        notSupport: "",
        support: "",
        target: "props.text",
        children: [],
      },
    },
    defaultSchema: {
      type: "captionCmp",
      layoutConfig: {
        width: 800,
        height: 100,
      },
      props: {
        width: 800,
        height: 100,
        text: "字幕",
        color: "#000",
        background: "#ccc",
        location: "顶部",
        direction: "从右往左",
        "font-size": 70,
      },
      animation: [],
      events: [],
      children: [],
    },
  },
];
