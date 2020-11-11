// TODO 容器也需要列入到协议内

export default {
  version: "1.0",
  description: "",
  container: {
    width: 500,
    height: 500,
  },
  change: [{}],
  pages: [{
    name: '页面1',
    id: 1,
    components: [
      {
        id: 1,
        name: "按钮1",
        type: "ElButton",
        layoutConfig: {
          zIndex: 1,
          top: 100,
          left: 100,
          width: 70,
          height: 40,
          opacity: 1,
        },
        props: {
          children: '点我',
        },
        animation: [],
        events: [
          {
            type: "alert",
            value: "hello",
          },
        ],
      },
    ],
  }],
};