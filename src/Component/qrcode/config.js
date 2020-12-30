export default {
  name: '二维码',
  notSupport: [

  ],
  extraTabs: [
    {
      type: "basicTab",
      name: "二维码配置",
      children: [
        {
          "type": "textFiled",
          "target": "props.text",
          "label": "二维码地址",
          "props": {},
        }
      ]
    }
  ]
};
