export default {
  name: '条形图',
  notSupport: [

  ],
  extraTabs: [
    {
      type: "chartTab",
      name: "条形图配置",
      target: {
        "switch": "props.legend.show",
        "data": {
          "th": "props.series",
          "td": "props.yAxis.data"
        },
      },
      children: []
    }
  ]
};
