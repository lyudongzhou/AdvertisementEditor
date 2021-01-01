export default {
  name: '折线图',
  notSupport: [

  ],
  extraTabs: [
    {
      type: "chartTab",
      name: "折线图配置",
      target: {
        "switch": "props.legend.show",
        "data": {
          "th": "props.series",
          "td": "props.xAxis.data"
        },
      },
      children: []
    }
  ]
};
