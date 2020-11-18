export const renderData = {
    version: "1.0",
    description: "",
    container: {
        width: 1000,
        height: 700,
        bgm: {
            autoPlay: true,
            src: "http://xes-h5-icourse.oss-cn-beijing.aliyuncs.com/test1/lvdongzhou/mapproject1021local/audio/Satie%20Gymnopedie%20No.1.mp3"
        }
    },
    change: [{}],
    pages: [{
        name: "",
        id: "",
        container: {
            backGround: { type: "color", value: "lightcyan" },
        },
        components: [
            {
                id: 1,
                name: "按钮1",
                type: "BtnCmp",
                layoutConfig: {
                    zIndex: 1,
                    top: 100,
                    left: 100,
                    rotation: Math.PI*10,
                    width: 100,
                    height: 100,
                    opacity: 1
                },
                props: {
                    bgUrl: "https://www.pixijs.com/wp/wp-content/uploads/pixijs-v5-logo-1.png"
                },
                animation: [

                ],
                events: [
                    {
                        type: "log",
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
                    top: 200,
                    left: 200,
                    rotation: Math.PI,
                    width: 200,
                    height: 200,
                    opacity: 1
                },
                props: {
                    bgUrl: "https://www.pixijs.com/wp/wp-content/uploads/pixijs-v5-logo-1.png"
                },
                animation: [

                ],
                events: [
                    {
                        type: "nextPage",
                        value: ""
                    }
                ],
                children: []
            }
        ],
    },
    {
        name: "",
        id: "",
        container: {
            backGround: { type: "image", value: "http://dik.img.kttpdq.com/pic/39/27153/5b61cb116a13028f_1680x1050.jpg" },
        },
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
                        type: "prePage",
                        value: ""
                    }
                ],
                children: []
            }
        ],
    }],
    dialogs: []
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
