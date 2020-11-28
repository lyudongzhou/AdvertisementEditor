export const REG_TABS = "RegistorTabs";
export const REG_ANIMATIONS = "RegistorAnimations";
export const REG_EVENTS = "RegistorEvents";
export const REG_COMPONENTS = "RegComponents";
export const REG_COMPONENTSSCHEMA = "RegComponentsSchema";
export const REG_EDITORS = "RegistorEditors";
export const DEFAULTTABS = [{
    type:"basicTab",
    name: "基本配置",
    children:[{
        label:"Y:",
        props:{},
        target:["layoutConfig","top"],
        type:"numberField"
    }]
}];