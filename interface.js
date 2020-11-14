export const renderData = {
    version: "1.0",
    description: "",
    container: {
        width: 500,
        height: 500,
        backGround:"lightcyan"
    },
    change: [{}],
    pages: [{
        components: [
            {
                id: 1,
                name: "按钮1",
                type: "BtnCmp",
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
                    bgUrl: "https://www.pixijs.com/wp/wp-content/uploads/pixijs-v5-logo-1.png"
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
            },
            {
                id: 2,
                name: "图片1",
                type: "ImageCmp",
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
                    bgUrl: "https://www.pixijs.com/wp/wp-content/uploads/pixijs-v5-logo-1.png"
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
    },
    {
        components: [
            {
                id: 1,
                name: "按钮2",
                type: "ImageCmp",
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
                    bgUrl: "http://img.xz7.com/up/2019-9/20199985738431530.jpg"
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
                type: "layout"
            },
            {
                type: "animation"
            }
        ],
        userDefine: [
            {
                title: "图片",
                key: 1,
                props: {
                    bgUrl: {
                        editor: {
                            type: "imageUploader",
                            props: {}
                        },
                        defaultValue: {

                        }
                    }
                }
            },
            {
                title: "图片",
                key: 2,
                props: {
                    bgUrl: {
                        label: "上传图片",
                        editor: {
                            type: "imageUploader",

                        },
                        defaultValue: {

                        }
                    }
                }
            }
        ]
    }
};
