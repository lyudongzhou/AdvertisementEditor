export const normal = {
  name: "svgs",
  notSupport: [],
  extraTabs: [
    {
      type: "basicTab",
      name: "颜色",
      children: [
        {
          "type": "colorpickerFiled",
          "target": "props.color",
          "label": "颜色",
          "props": {
            "changeType": "cmp",
            "type": {
              "before": "BEFORE_UPDATE_COMPONENT_PROPS",
              "update": "UPDATING_COMPONENT_PROPS",
              "after": "AFTER_UPDATE_COMPONENT_PROPS"
            }
          },
        }
      ]
    }
  ],
};
export const mask = {
  name: "svgsmask",
  notSupport: [],
  extraTabs: [
    {
      type: "svgMaskTab",
      name: "图片容器配置",
      children: [
      ],
    },
  ],
};
