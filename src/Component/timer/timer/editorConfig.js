export default [
  {
    name: "计时器",
    position: "3.2.2",
    after: {
      title: "倒计时配置",
      tab: {
        type: "TimerTab",
        name: "计时器配置",
        notSupport: [],
        support: "",
        target: {},
        children: []
      },
    },
    defaultSchema: {
      type: "timerCmp",
      layoutConfig: {
        width: 100,
        height: 50,
      },
      props: {
        background: "transparent",
        color: "#000",
        fontSize: "30",
        countTime: 10,
        text: "0",
        fontAlign: "center",
      },
      animation: [],
      events: [],
      children: [],
    },
  },
];
