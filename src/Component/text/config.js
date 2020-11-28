export default {
    notSupport: [
        {
            type: "layout"
        },
        {
            type: "animation"
        }
    ],
    extraTabs: [
        {
            type: "normal",
            name: "字体配置",
            children: [
                {
                    label:"字体颜色",
                    type: "colorPicker",
                    target: ["props", "textColor"],
                    props: {
                        allowEmpty:false
                    }
                }
            ]
        }
    ]
};