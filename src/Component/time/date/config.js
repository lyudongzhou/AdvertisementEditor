export default {
  name: '日期',
  notSupport: [

  ],
  extraTabs: [
    {
      type: "timeTab",
      name: "时间配置",
      target: "props.text",
      notSupport: "文本",
      support: "显示格式",
      children: []
    }
  ]
};
