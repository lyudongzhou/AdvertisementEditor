export const renderData = {
    version: "1.0",
    description: "",
    container: {
        width: 500,
        height: 500
    },
    change: [{}],
    pages: [{
        components: [
            {
                id: 1,
                name: "按钮1",
                type: "Button",
                layoutConfig: {
                    zIndex: 1,
                    top: 100,
                    left: 100,
                    rotation: Math.PI,
                    width: 1,
                    height: 1,
                    opacity: 1
                },
                props: {
                    bgUrl: "/image/btn.png"
                },
                animation: [

                ],
                events: [
                    {
                        type: "openDialog",
                        value: "Dialog1"
                    }
                ],
                children: []
            }
        ],
    }]
};
export const staticEditorData = {
    Button: {
        notSupport: [
            {
                type:"layout"
            },
            {
                type:"animation"
            }
        ],
        userDefine:[
            {
                title:"图片",
                key:1,
                props:{
                    bgUrl:{
                        editor:{
                            type:"imageUploader",
                            props:{}
                        },
                        defaultValue:{

                        }
                    }
                }
            },
            {
                title:"图片",
                key:2,
                props:{
                    bgUrl:{
                        label:"上传图片",
                        editor:{
                            type:"imageUploader",

                        },
                        defaultValue:{

                        }
                    }
                }
            }
        ]
    }
};
