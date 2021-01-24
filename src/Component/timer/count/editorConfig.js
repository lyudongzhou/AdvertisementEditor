export default [
  {
    name: "正计时",
    position: "3.2.1",
    after: {
      title: "正计时配置",
      tab: {
        type: "CountTab",
        name: "正计时配置",
        notSupport: [],
        support: "",
        target: {},
        children: [],
      },
    },
    defaultSchema: {
      type: "countCmp",
      layoutConfig: {
        width: 300,
        height: 50,
      },
      props: {
        background: "transparent",
        color: "#000",
        fontSize: "30",
        countTime: 10,
        text: "还没开始！",
        format: "ddHHmmss",
        startTime: new Date().getTime(),
        fontAlign: "center",
      },
      animation: [],
      events: [],
      children: [],
    },
  },
];
