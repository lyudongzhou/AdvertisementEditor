export const REG_TABS = "RegistorTabs";
export const REG_ANIMATIONS = "RegistorAnimations";
export const REG_EVENTS = "RegistorEvents";
export const REG_COMPONENTS = "RegComponents";
export const REG_COMPONENTSSCHEMA = "RegComponentsSchema";
export const REG_EDITORS = "RegistorEditors";
export const DEFAULTTABS = [
    {
        type: "basicTab",
        name: "Basic Config",
        children: [
            {
                label: "X:",
                props: {},
                target: "layoutConfig.left",
                type: "numberField"
            },
            {
                label: "Y:",
                props: {},
                target: "layoutConfig.top",
                type: "numberField"
            }
        ]
    },
    {
        type: "basicTab",
        name: "Advanced Config",
        children: [
            {
                label: "X:",
                props: {},
                target: "layoutConfig.left",
                type: "numberField"
            },
            {
                label: "Y:",
                props: {},
                target: "layoutConfig.top",
                type: "numberField"
            }
        ]
    }
];