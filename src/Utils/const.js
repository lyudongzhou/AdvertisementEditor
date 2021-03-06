export const REG_TABS = "RegistorTabs";
export const REG_ANIMATIONS = "RegistorAnimations";
export const REG_EVENTS = "RegistorEvents";
export const REG_COMPONENTS = "RegComponents";
export const REG_COMPONENTSSCHEMA = "RegComponentsSchema";
export const REG_EDITORS = "RegistorEditors";
export const REG_TITLECONFIG = "REG_TITLECONFIG";
export const SVGS = "SVGS";
export const REG_GETRES = "REG_GETRES";
export const DEFAULTTABS = [
  {
    type: "layoutTab",
    name: "基础",
  },
  {
    type: "animateTab",
    name: "动画",
  },
  {
    type: "eventTab",
    name: "互动事件",
  },
  {
    type: "basicTab",
    name: "边框",
    children: [
      {
        type: "numberField",
        target: "layoutConfig.border-width",
        label: "边框尺寸（像素）",
        props: {},
      },
      {
        type: "vcolorpicker",
        target: "layoutConfig.border-color",
        label: "边框颜色",
        props: {},
      },
      {
        type: "numberField",
        target: "layoutConfig.border-radius",
        label: "边框圆角半径（像素）",
        props: {},
      },
    ],
  },
];
export const FONTDEFINE = [
  {
    value: "微软雅黑",
    label: "微软雅黑",
  },
  {
    value: "黑体",
    label: "黑体",
  },
];
export const SVGS_DETAIL="SVGS_DETAIL";
