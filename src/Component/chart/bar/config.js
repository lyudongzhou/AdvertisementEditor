export default {
  name: '柱状图',
  notSupport: [

  ],
  extraTabs: [
    {
      type: "chartTab",
      name: "柱状图配置",
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
