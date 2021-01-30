export default [
  {
    name: "日期",
    position: "3.1.1",
    after: {
      title: "日期配置",
      tab: {
        type: "timeTab",
        name: "日期配置",
        notSupport: "文本",
        support: "显示格式",
        target: "props.text",
        children: [],
      },
    },
    defaultSchema: {
      type: "dateCmp",
      layoutConfig: {
        width: 100,
        height: 50
      },
      props: {
        width: 100,
        height: 50,
        background: "transparent",
        color: "#000",
        text: "",
        "font-size": 20,
        "font-family": "黑体"
      },
      animation: [],
      events: [],
      children: []
    }
  }
]
