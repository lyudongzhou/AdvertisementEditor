export default {
  name: '网页',
  notSupport: [

  ],
  extraTabs: [
    {
      type: "basicTab",
      name: "网页配置",
      children: [
        {
          "type": "textField",
          "target": "props.text",
          "label": "网页地址",
          "props": {},
        }
      ]
    }
  ]
};
