export default {
  name: '饼图',
  notSupport: [

  ],
  extraTabs: [
    {
      type: "chartTab",
      name: "饼图配置",
      target: {
        "switch": "props.legend.show",
        "data": {
          "th": null,
          "td": "props.series.0.data"
        },
      },
      children: [

      ]
    }
  ]
};
